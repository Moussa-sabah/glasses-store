

const asyncHandler = require('express-async-handler')
const { User, validateUpdateUser } = require('../models/User')
const path = require('path')
const {cloudinaryUploadImage,cloudinaryRemoveImage} = require('../utils/cloudinary')
// Get all users -------- /api/users
module.exports.getAllUsersController = asyncHandler(async (req, res) => {
  const users = await User.find()
  res.status(200).json(users)
})

// Get one user -------- /api/users/user/:id
module.exports.getOneUserController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate('productsReviews webReviews')
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  res.status(200).json(user)
})


module.exports.updateUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body)
  if (error) {
    return res.status(401).json({ message: error.details[0].message })
  }
  const user = await User.findById(req.params.id)
  if (!user) {
    return res.status(404).json({ message: 'Not found user ' })
  }

  const updateUser =await User.findByIdAndUpdate(req.params.id, {
    $set: {
      userName: req.body.userName
    }
  }, { new: true })

  res.status(200).json(updateUser)

})


module.exports.updateUserPhotoCtrl = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(401).json({ message: 'no file' })
  }

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`)

  const result = await cloudinaryUploadImage(imagePath)
  console.log(result)
  const user = await User.findById(req.user.id)

  if (user.image.publicId !== null) {
    await cloudinaryRemoveImage(user.image.publicId)
  }

  user.image = {
    url: result.secure_url,
    publicId: result.public_id
  }

  await user.save()

  res.status(200).json({
    message: 'user profile photo uploaded successfully  ',
    image: user.image
  })

  fs.unlinkSync(imagePath)
})


module.exports.deleteUserCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return res.status(400).json({ message: 'not found' })
  }


  if (user.image.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId)
  }

  await User.findByIdAndDelete(req.params.id)

  res.status(200).json({ message: 'user has been deleted' })
})