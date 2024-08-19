

const mongoose = require('mongoose')
const joi = require('joi')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({

  userName: {
    type: String,
    trim: true,
    required: true,
    minlength: 2,
    maxlength: 50,
  },

  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8
  },

  image: {
    type: Object,
    default: {
      url: 'https://nomeadvocatenkantoor.nl/assets/uploads/2017/11/no-picture.jpg',
      publicId: null
    }
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isAccountVerification: {
    type: Boolean,
    default: false
  },
  favorites: {
    type: Array,
  },
  cart: {
    type: Array
  }


}, {

  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

userSchema.virtual('productsReviews', {
  ref: 'ProductReview',
  foreignField: 'user',
  localField: '_id'
})

userSchema.virtual('webReviews', {
  ref: 'WebReview',
  foreignField: 'user',
  localField: '_id'
})

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET)
}

const User = mongoose.model('User', userSchema)


function validateRegister(obj) {
  const schema = joi.object({
    userName: joi.string().trim().min(2).max(50).required(),
    email: joi.string().trim().required().email(),
    password: joi.string().trim().min(8).required()
  })
  return schema.validate(obj)
}

function validateLogin(obj) {
  const schema = joi.object({
    email: joi.string().trim().required().email(),
    password: joi.string().trim().min(8).required()
  })

  return schema.validate(obj)

}

function validateUpdateUser(obj) {
  const schema = joi.object({
    userName: joi.string().trim().min(2).max(50),
  })
  return schema.validate(obj)
}


function validateEmail(obj) {
  const schema = joi.object({
    email: joi.string().trim().required().email(),
  })
  return schema.validate(obj)
}

function validateNewPassword(obj) {
  const schema = joi.object({
    password: joi.string().trim().min(8).required()
  })
  return schema.validate(obj)
}


module.exports = {
  User,
  validateRegister,
  validateLogin,
  validateUpdateUser,
  validateEmail,
  validateNewPassword
}