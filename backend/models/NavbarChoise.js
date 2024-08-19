



const mongoose = require('mongoose')
const joi = require('joi')

const navbarChoiseSchema = new mongoose.Schema({

  title: {
    type: String,
    trim: true,
    required: true,
  }
},{
  timestamps:true,
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
})

navbarChoiseSchema.virtual('categories', {
  ref: 'Category',
  foreignField: 'navbarChoise',
  localField: '_id'
})

const NavbarChoise = mongoose.model('NavbarChoise', navbarChoiseSchema)

function validateCreateNavbarChoise(obj) {
  const schema = joi.object({
    title: joi.string().trim().required()
  })

  return schema.validate(obj)
}

function validateUpdateNavbarChoise(obj) {
  const schema = joi.object({
    title: joi.string().trim()
  })

  return schema.validate(obj)
}

module.exports = {
  NavbarChoise,
  validateCreateNavbarChoise,
  validateUpdateNavbarChoise
}


