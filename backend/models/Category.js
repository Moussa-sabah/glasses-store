

const mongoose = require('mongoose')
const joi = require('joi')

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  navbarChoise: {
    type: mongoose.Types.ObjectId,
    ref: 'NavbarChoise',
    required: true
  }
}, {
  timestamps: true
})


const Category = mongoose.model('Category', categorySchema)

function validateCreateCategory(obj) {
  const schema = joi.object({
    title: joi.string().trim().required(),
    navbarChoise: joi.string().required()
  })

  return schema.validate(obj)
}


function validateUpdateCategory(obj) {
  const schema = joi.object({
    title: joi.string().trim(),
  })

  return schema.validate(obj)
}

module.exports = {
  Category,
  validateCreateCategory,
  validateUpdateCategory
}