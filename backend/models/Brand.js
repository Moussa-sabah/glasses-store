

const mongoose = require('mongoose')

const joi = require('joi')

const brandSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
},
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  })

brandSchema.virtual('categories', {
  ref: 'CategoriesOfBrands',
  foreignField: 'brand',
  localField: '_id'
})

const Brand = mongoose.model('Brand', brandSchema)

function validateCreateBrand(obj) {
  const schema = joi.object({
    title: joi.string().trim().required()
  })
  return schema.validate(obj)
}

function validateUpdateBrand(obj) {
  const schema = joi.object({
    title: joi.string().trim()
  })
  return schema.validate(obj)
}


module.exports = { Brand, validateCreateBrand, validateUpdateBrand }
