const express = require('express');
const router = express.Router();

const {
    getProducts,
    getSingleProduct,
    newProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview
} = require('../controllers/productController');

const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/reviews').get(getProductReviews);
router.route('/reviews').delete(isAuthenticatedUser, deleteReview);

router.route('/admin/product/new').post(isAuthenticatedUser, authorizedRoles('admin'), newProduct);

router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizedRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteProduct);

router.route('/review').put(isAuthenticatedUser, createProductReview);
module.exports = router;