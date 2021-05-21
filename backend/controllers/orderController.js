const Order = require('../models/order');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const order = require('../models/order');

// create a new order => /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(200).json({
        success: true,
        order
    });
});

// Get Single Order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) {
        next(new ErrorHandler('No order Found with this ID', 404));
    }
    res.status(200).json({
        success: true,
        order
    });
});
// Get all order logged in user => /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json({
        success: true,
        orders
    });
});

// Get all order by admin => /api/v1//admin/orders
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});

// Update process of order by admin => /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler('You have already Delivered this order', 400));
    }
    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity);
    });
    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now()
    await order.save();
    res.status(200).json({
        success: true,
    });
});
// Order Stock Update
async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false });
}

// Delete Order Admin Only => /api/v1/admin/order/:id
// Get all order by admin => /api/v1//admin/orders
exports.deleteOrders = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        next(new ErrorHandler('No order Found with this ID', 404));
    }
    await order.remove();
    res.status(200).json({
        success: true
    });
});