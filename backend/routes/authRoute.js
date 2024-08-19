const { registerUserController, loginUserController, verificationUserEmail } = require('../controllers/authController')
const { sendResetPasswordLinkCtrl, getResetPasswordPageCtrl, resetPasswordCtrl } = require('../controllers/passwordcontroller')


const router = require('express').Router()

router.route('/register').post(registerUserController)
router.route('/login').post(loginUserController)
router.route('/:userId/verify/:token').get(verificationUserEmail)
router.route('/send-reset-passwprd-link').post(sendResetPasswordLinkCtrl)
router
  .route('/reset-password/:userId/:token')
  .get(getResetPasswordPageCtrl)
  .post(resetPasswordCtrl)

module.exports = router