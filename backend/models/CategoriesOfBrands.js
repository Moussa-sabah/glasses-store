




const mongoose = require('mongoose')
const joi = require('joi')

const categoriesOfBrandsSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  brand: {
    type: mongoose.Types.ObjectId,
    ref: 'Brand',
    required: true
  }
},{
  timestamps:true
})


const CategoriesOfBrands = mongoose.model('CategoriesOfBrands', categoriesOfBrandsSchema)

function validateCreateCategory(obj) {
  const schema = joi.object({
    title: joi.string().trim().required(),
    brand: joi.string().required()
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
  CategoriesOfBrands,
  validateCreateCategory,
  validateUpdateCategory
}