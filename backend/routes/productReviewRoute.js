

const router = require('express').Router()
const { createProductReviewCtrl, getAllProductReviewsCtrl, updateProductReviewCtrl, deleteProductReviewCtrl, getReviewsOfProduct, getOneProdectReviewCtrl } = require('../controllers/productReviewController')
const { verifyToken, verifyTokenAndUser, verifyTokenAndAdminAndUser } = require('../middlewares/verifyToken')
const validateObjectId = require('../middlewares/validateObjectId')

router
  .route('/')
  .post(verifyToken, createProductReviewCtrl)
  .get(getAllProductReviewsCtrl)

router
  .route('/:id')
  .get(validateObjectId, getOneProdectReviewCtrl)
  .put(validateObjectId, verifyToken, updateProductReviewCtrl)
  .delete(validateObjectId, verifyTokenAndAdminAndUser, deleteProductReviewCtrl)

router
  .route('/reviews/:id')
  .get(validateObjectId, getReviewsOfProduct)


module.exports = router