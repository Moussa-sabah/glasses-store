




const joi = require('joi')
const mongoose = require('mongoose')


const productReviewSchema = new mongoose.Schema({

  reviewTitle: {
    type: String,
    maxlength: 15,
    trim: true,
    required: true,

  },
  reviewText: {
    type: String,
    maxlength: 120,
    trim: true,
    required: true,
  },

  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    require: true
  }
}, {
  timestamps: true
})


const ProductReview = mongoose.model('ProductReview', productReviewSchema)

function validateCreateProductReview(obj) {

  const schema = joi.object({
    reviewTitle: joi.string().max(15).trim().required(),
    reviewText: joi.string().max(120).trim().required(),
    product: joi.string().required()
  })
  return schema.validate(obj)
}


function validateUpdateProductReview(obj) {

  const schema = joi.object({
    reviewTitle: joi.string().max(15).trim(),
    reviewText: joi.string().max(120).trim(),
  })
  return schema.validate(obj)
}




module.exports = {
  ProductReview,
  validateCreateProductReview,
  validateUpdateProductReview
}


