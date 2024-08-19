

const asyncHandler = require('express-async-handler')
const { validateRegister, User, validateLogin } = require('../models/User')
const bcrypt = require('bcrypt')
const { VerificationToken } = require('../models/VerificationToken')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')

// Register ------ /api/auth/register
module.exports.registerUserController = asyncHandler(async (req, res) => {

  const { error } = validateRegister(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  let user = await User.findOne({ email: req.body.email })

  if (user) {
    return res.status(400).json({ message: 'user already exist' })
  }

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  user = await User.create({
    userName: req.body.userName,
    email: req.body.email,
    password: hashPassword
  })

  // Verification email

  const verificationToken = await VerificationToken.create({
    userId: user._id,
    token: crypto.randomBytes(32).toString('hex')
  })

  const link = `http://localhost:3000/users/${user._id}/verify/${verificationToken.token}`

  const htmlTemplate = `
  <div>
  <p>click on the link in below to verify your email</p>
  <a href=${link}>verify</a>
  </div>
  `

  await sendEmail(user.email, 'Verify your email', htmlTemplate)

  res.status(201).json({ message: 'We sent to you email , please check inbox to verify your email' })

})



//Login ------- /api/auth/login
module.exports.loginUserController = asyncHandler(async (req, res) => {
  const { error } = validateLogin(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  const user = await User.findOne({ email: req.body.email })


  if (!user) {
    return res.status(400).json({ message: 'invalid email or password' })
  }

  const checkPassword = await bcrypt.compare(req.body.password, user.password)

  if (!checkPassword) {
    return res.status(400).json({ message: 'invalid email or password' })
  }


  if (!user.isAccountVerification) {
    let verificationToken = await VerificationToken.findOne({ userId: user._id })
    if (!verificationToken) {
      verificationToken = await VerificationToken.create({
        userId: user._id,
        token: crypto.randomBytes(32).toString('hex')
      })
    }
    const link = `http://localhost:3000/users/${user._id}/verify/${verificationToken.token}`

    const htmlTemplate = `
    <div>
    <p>click on the link in below to verify your email</p>
    <a href=${link}>verify</a>
    </div>
    `

    await sendEmail(user.email, 'Verify your email', htmlTemplate)

    res.status(201).json({ message: 'We sent to you email , please check inbox to verify your email' })

  }



  const token = user.generateAuthToken()

  res.status(200).json({
    userName: user.userName,
    token: token,
    isAdmin: user.isAdmin,
    id: user._id,
    image: user.image
  })

})


//Verification email ------- /api/auth/user/:userId/verify/:token
module.exports.verificationUserEmail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId)
  if (!user) {
    return res.status(401).json({ message: 'invalid id' })
  }

  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token
  })

  if (!verificationToken) {
    return res.status(401).json({ message: 'invalid id' })
  }

  user.isAccountVerification = true
  await user.save()

  await VerificationToken.deleteOne(verificationToken)

  res.status(200).json({ message: 'Your email is verified successfully, please log in' })
})

