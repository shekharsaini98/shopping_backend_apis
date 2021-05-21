const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
// Register user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatars/kkcsnjbaskbasygasdbk',
            url: 'https://re.asdkja.asldijdjasfa/avatars/catchAsyncErrors.png'
        }
    });
    sendToken(user, 201, res);
});

// User Login /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    // if any field(email, password) is empty 
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password', 400));
    }
    // Find User
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorHandler('Invalid Email and Password', 401));
    }
    // Compare password
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email and Password', 401));
    }
    sendToken(user, 201, res);
});
// Forget Password  api/v1/password/forgot
exports.forgetPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler(`User not found with this email`, 404));
    }
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const message = `Your reset password token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, ignore it.`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'Password Recovery',
            message
        });
        res.status(200).json({
            success: true,
            message: `Email send to: ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        next(new ErrorHandler(error.message, 500));
    }
});

// Reset password api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // encrypt token to match with DB pass
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });
    if (!user) {
        next(new ErrorHandler('Password reset token is invalid or has been expired'));
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler(`Password does not match`, 400))
    }
    // password reset
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);
});

// Get currently logged in user details =>  /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
});
// Update/Change Password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    // check old password
    const isMatched = await user.comparePassword(req.body.oldPassword);
    if (!isMatched) {
        return next(`Old password is incorrect`, 400);
    }
    user.password == req.body.password;
    await user.save();
    sendToken(user, 200, res);
});
// Update User Profile => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    // update avatar : TODO
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    });
    res.status(200).json({
        success: true,
        user
    });
});
// User Logout api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expire: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: 'Logged Out'
    });
});
// Admin Routes
// Get all users /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
});
// Get specific user => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User does not found with id ${req.params.id}`, 401));
    }
    res.status(200).json({
        success: true,
        user
    })
});
// Update User By Admin => /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    // update avatar : TODO
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    });
    res.status(200).json({
        success: true,
    });
});
// Delete User By Admin => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User does not found with id ${req.params.id}`, 401));
    }
    // Remove Avatar -TODO
    await user.remove()
    res.status(200).json({
        success: true,
    })
});