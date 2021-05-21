const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name.'],
        trim: true,
        maxlength: [100, 'Product name cannot exceed 100 characters.']
    },
    price: {
        type: Number,
        required: [true, 'Price is required.'],
        maxlength: [5, 'Price cannot exceed 5 digits'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please provide category'],
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Laptops',
                'Headphones',
                'Food',
                'Books',
                'Outdoor',
                'Sports',
                'Accessories'
            ],
            message: 'Please select correct category for product'
        },
    },
    seller: {
        type: String,
        required: [true, 'Provide product seller name']
    },
    stock: {
        type: Number,
        required: [true, 'Provide product stock count.'],
        maxlength: [5, 'Stock length not exceed 5 digits.'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Product', productSchema);