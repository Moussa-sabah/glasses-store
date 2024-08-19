const { createNavbarChoiseCtrl, getAllNavbarChoises, getOneNavbarChoise, deleteNavbarChoise, updateNavbarChoiseCtrl } = require('../controllers/navbarChoiseController')
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken')

const router = require('express').Router()


router
  .route('/')
  .post(verifyTokenAndAdmin, createNavbarChoiseCtrl)
  .get(getAllNavbarChoises)


router
  .route('/:id')
  .get(getOneNavbarChoise)
  .put(verifyTokenAndAdmin, updateNavbarChoiseCtrl)
  .delete(verifyTokenAndAdmin, deleteNavbarChoise)

module.exports = router