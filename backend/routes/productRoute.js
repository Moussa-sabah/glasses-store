

const router = require('express').Router()



const { createProductCtrl, getAllProductsCtrl,
  getOneProductCtrl, updateProductCtrl,
  deleteProductCtrl, updateProductImageCtrl,
  toggleToFavoritesCtrl, usersAddToFavoritesCtrl,
  toggleToCartCtrl,
  usersAddToCartCtrl,
  getRecentAddProductsCtrl,
  getAllFavorites,
  getAllReviewsOfProduct,
  getCartCtrl,
  addMoreOfProductToCartCtrl,
  reduceProductFromCartCtrl,
  deleteProductFromCartCtrl } = require('../controllers/productController')


const { verifyTokenAndAdmin, verifyTokenAndUser, verifyToken } = require('../middlewares/verifyToken')
const uploadImage = require('../middlewares/uploadImage')
const validateObjectId = require('../middlewares/validateObjectId')


router.route('/')
  .post(verifyTokenAndAdmin, uploadImage.single('image'), createProductCtrl)
  .get(getAllProductsCtrl)

router
  .route('/:id')
  .get(validateObjectId, getOneProductCtrl)
  .put(validateObjectId, verifyTokenAndAdmin, updateProductCtrl)
  .delete(validateObjectId, verifyTokenAndAdmin, deleteProductCtrl)

router.route('/update-image/:id')
  .put(validateObjectId, verifyTokenAndAdmin, uploadImage.single('image'), updateProductImageCtrl)

router.route('/add-favorites/:id')
  .put(validateObjectId, verifyToken, toggleToFavoritesCtrl)

router
  .route('/users-favorites/:id')
  .put(validateObjectId, verifyToken, usersAddToFavoritesCtrl)

router
  .route('/add-cart/:id')
  .put(validateObjectId, verifyToken, toggleToCartCtrl)

router
  .route('/users-cart/:id')
  .put(validateObjectId, verifyToken, usersAddToCartCtrl)

router
  .route('/recent-add/home')
  .get(getRecentAddProductsCtrl)

router
  .route('/favorites/favorites-products')
  .get(verifyToken, getAllFavorites)

router
  .route('/cart/cart-products')
  .get(verifyToken, getCartCtrl)

router
  .route('/add-more-cart/:id')
  .put(validateObjectId, verifyToken, addMoreOfProductToCartCtrl)

router
  .route('/reduce-from-cart/:id')
  .put(validateObjectId, verifyToken, reduceProductFromCartCtrl)

router
  .route('/delete-from-cart/:id')
  .put(validateObjectId, verifyToken, deleteProductFromCartCtrl)

module.exports = router