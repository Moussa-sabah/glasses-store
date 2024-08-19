
const router = require('express').Router()
const { createCategoryCtrl, getAllCategoryCtrl, getOneCategoryCtrl, updateCategoryCtrl, deleteCategoryCtrl } = require('../controllers/categoryController')
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken')
const validateObjectId = require('../middlewares/validateObjectId')

router
  .route('/')
  .post(verifyTokenAndAdmin, createCategoryCtrl)
  .get(getAllCategoryCtrl)

router
  .route('/:id')
  .get(validateObjectId, getOneCategoryCtrl)
  .put(validateObjectId, verifyTokenAndAdmin, updateCategoryCtrl)
  .delete(validateObjectId, verifyTokenAndAdmin, deleteCategoryCtrl)

module.exports = router