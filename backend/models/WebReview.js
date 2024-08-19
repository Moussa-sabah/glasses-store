

const joi = require('joi')
const mongoose = require('mongoose')


const webReviewSchema = new mongoose.Schema({

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
  }
},{
  timestamps:true
})


const WebReview = mongoose.model('WebReview', webReviewSchema)

function validateCreateWebReview(obj) {

  const schema = joi.object({
    reviewTitle: joi.string().max(15).trim().required(),
    reviewText: joi.string().max(120).trim().required(),
  })
return schema.validate(obj)
}


function validateUpdateWebReview(obj) {

  const schema = joi.object({
    reviewTitle: joi.string().max(15).trim(),
    reviewText: joi.string().max(120).trim(),
  })
return schema.validate(obj)
}




module.exports = {
  WebReview,
  validateCreateWebReview,
  validateUpdateWebReview
}


