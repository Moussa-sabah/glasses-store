const { createWebReviewCtrl, getAllWebReviewsCtrl, updateWebReviewCtrl, deleteWebReviewCtrl, getOneWebReviewCtrl } = require('../controllers/webReviewController')
const { verifyToken, verifyTokenAndUser, verifyTokenAndAdminAndUser } = require('../middlewares/verifyToken')
const validateObjectId = require('../middlewares/validateObjectId')

const router = require('express').Router()

router
  .route('/')
  .post(verifyToken, createWebReviewCtrl)
  .get(getAllWebReviewsCtrl)


router
  .route('/:id')
  .get(validateObjectId, getOneWebReviewCtrl)
  .put(validateObjectId, verifyToken, updateWebReviewCtrl)
  .delete(validateObjectId, deleteWebReviewCtrl)

module.exports = router