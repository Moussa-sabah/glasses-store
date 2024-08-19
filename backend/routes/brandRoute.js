

const router = require('express').Router()
const { createBrandCtrl, getAllBrandsCtrl, updateBrandCtrl, deleteBrandCtrl, getOneBrandCtrl } = require('../controllers/brandController')
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken')
const validateObjectId = require('../middlewares/validateObjectId')

router
  .route('/')
  .post(verifyTokenAndAdmin, createBrandCtrl)
  .get(getAllBrandsCtrl)

router
  .route('/:id')
  .get(validateObjectId,getOneBrandCtrl)
  .put(validateObjectId, verifyTokenAndAdmin, updateBrandCtrl)
  .delete(validateObjectId, verifyTokenAndAdmin, deleteBrandCtrl)

module.exports = router