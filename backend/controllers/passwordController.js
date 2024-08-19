

const asyncHandler = require('express-async-handler')
const { User, validateEmail, validateNewPassword } = require('../models/User')
const { VerificationToken } = require('../models/VerificationToken')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')
const bcrypt = require('bcrypt')



// Send reset password link --------- /api/auth/send-reset-passwprd-link
module.exports.sendResetPasswordLinkCtrl = asyncHandler(async (req, res) => {

  const { error } = validateEmail(req.body)
  if (error) {
    return res.status(401).json({ message: error.details[0].message })
  }

  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(404).json({ message: 'Not found user' })
  }

  let verificationToken = await VerificationToken.findOne({ userId: user._id })

  if (!verificationToken) {
    verificationToken = await VerificationToken.create({
      userId: user._id,
      token: crypto.randomBytes(32).toString('hex')
    })
  }

  const link = `http://localhost:3000/reset-password/${user._id}/${verificationToken.token}`

  const htmlTemplate = `<a href=${link}>click here to reset your password</a>`

  await sendEmail(user.email, 'Reset Password', htmlTemplate)

  res.status(200).json({ message: 'We send email to reset your password, please check you inbox' })

})

// get reset password link ---------- /api/auth/:userId/:token
module.exports.getResetPasswordPageCtrl = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.userId)
  if (!user) {
    return res.status(401).json({ message: 'Invalid link' })
  }

  let verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token
  }
  )
  if (!verificationToken) {
    return res.status(401).json({ message: 'Invalid link' })
  }

  res.status(200).json({ message: 'Valid link' })
})


// reset password -------------- /api/auth/:userId/:token
module.exports.resetPasswordCtrl = asyncHandler(async (req, res) => {

  const { error } = validateNewPassword(req.body)
  if (error) {
    return res.status(401).json({ message: error.details[0].message })
  }

  const user = await User.findById(req.params.userId)
  if (!user) {
    return res.status(401).json({ message: 'Invalid link' })
  }

  let verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token
  }
  )
  if (!verificationToken) {
    return res.status(401).json({ message: 'Invalid link' })
  }

  if (!user.isAccountVerification) {
    user.isAccountVerification = true
  }

  const salt = await bcrypt.genSalt(10)
  const hashPassord = await bcrypt.hash(req.body.password, salt)

  user.password = hashPassord
  await user.save()

  await VerificationToken.deleteOne(verificationToken)
  res.status(200).json({ message: 'password has benn changed successfully, please login' })

})