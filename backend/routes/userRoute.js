const { getAllUsersController, getOneUserController, getUsersCountController, updateUserPhotoCtrl, deleteUserCtrl, updateUserCtrl } = require('../controllers/userController')
const validateObjectId = require('../middlewares/validateObjectId')
const { verifyTokenAndUser, verifyTokenAndAdminAndUser, verifyTokenAndAdmin, verifyToken } = require('../middlewares/verifyToken')
const uploadImage = require('../middlewares/uploadImage')
const router = require('express').Router()



router
.route('/').get(verifyTokenAndAdmin, getAllUsersController)

router
  .route('/user/:id')
  .get(validateObjectId, getOneUserController)
  .put(validateObjectId, verifyTokenAndUser, updateUserCtrl)
  .delete(validateObjectId, verifyTokenAndAdminAndUser, deleteUserCtrl)


router
  .route('/photo/updatePhoto')
  .post(verifyToken, uploadImage.single('image'), updateUserPhotoCtrl)


module.exports = router