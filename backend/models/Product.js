

const mongoose = require('mongoose')
const joi = require('joi')

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  navbarChoise: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    trim: true,
    required: true
  },
  newPrice: {
    type: Number,
    trim: true,
    required: true,
  },
  oldPrice: {
    type: Number,
    trim: true,
  },

  image: {
    type: Object,
    default: {
      url: '',
      publicId: null,
    },
    required: true,
  },
  usersAddToFavorites: {
    type: Array
  },
  usersAddToCart: {
    type: Array
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})


productSchema.virtual('reviews', {
  ref: 'ProductReview',
  foreignField: 'product',
  localField: '_id'
})


const Product = mongoose.model('Product', productSchema)

function validateCreateProduct(obj) {
  const schema = joi.object({
    title: joi.string().trim().required(),
    navbarChoise: joi.string().required(),
    category: joi.string().required(),
    brand: joi.string().trim().required(),
    newPrice: joi.number().required(),
    oldPrice: joi.number(),
  })
  return schema.validate(obj)
}

function validateUpdateProduct(obj) {
  const schema = joi.object({
    title: joi.string().trim(),
    navbarChoise: joi.string(),
    category: joi.string(),
    brand: joi.string().trim(),
    newPrice: joi.number(),
    oldPrice: joi.number()
  })
  return schema.validate(obj)
}





module.exports = {
  Product,
  validateCreateProduct,
  validateUpdateProduct
}


