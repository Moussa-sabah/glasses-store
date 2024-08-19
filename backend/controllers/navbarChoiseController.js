
const asyncHandler = require('express-async-handler')
const { NavbarChoise, validateCreateNavbarChoise, validateUpdateNavbarChoise } = require('../models/NavbarChoise')
const { Category } = require('../models/Category')
const { Product } = require('../models/Product')

// Create navbarChoise -------  /api/navbar-choise
module.exports.createNavbarChoiseCtrl = asyncHandler(async (req, res) => {

  const { error } = validateCreateNavbarChoise(req.body)
  if (error) {
    return res.status(401).json({ message: error.details[0].message })
  }

  const navbatChoise = await NavbarChoise.create({
    title: req.body.title
  })

  res.status(201).json(navbatChoise)

})



// Get all navbar choises --------- /api/navbar-choise
module.exports.getAllNavbarChoises = asyncHandler(async (req, res) => {
  const navbarChoises = await NavbarChoise.find().populate('categories')
  res.status(200).json(navbarChoises)
})



// Get one navbar choise --------- /api/navbar-choise/:id
module.exports.getOneNavbarChoise = asyncHandler(async (req, res) => {
  const navbarChoise = await NavbarChoise.findById(req.params.id).populate('categories')
  if (!navbarChoise) {
    return res.status(404).json({ message: 'Navbar choise not found' })
  }
  res.status(200).json(navbarChoise)
})


// Update navbar choise --------- /api/navbar-choise/:id
module.exports.updateNavbarChoiseCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateNavbarChoise(req.body)
  if (error) {
    return res.status(401).json({ message: error.details[0].message })
  }

  const navbarChoise = await NavbarChoise.findById(req.params.id)
  if (!navbarChoise) {
    return res.status(404).json({ message: 'Navbar choise not found' })
  }

  const pastTitle = navbarChoise.title

  const updateNavbarChoise = await NavbarChoise.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title
    }
  }, { new: true })

  await Product.updateMany({ navbarChoise: pastTitle }, {
    $set: {
      navbarChoise: updateNavbarChoise.title
    }
  }, { new: true })
  res.status(200).json(updateNavbarChoise)
})


// Delete navbar choise --------- /api/navbar-choise/:id
module.exports.deleteNavbarChoise = asyncHandler(async (req, res) => {
  const navbarChoise = await NavbarChoise.findById(req.params.id)
  if (!navbarChoise) {
    return res.status(404).json({ message: 'Navbar choise not found' })
  }
  const id = navbarChoise?._id
  await Category.deleteMany({ navbarChoise: req.params.id })
  await Product.deleteMany({ navbarChoise: navbarChoise.title })
  await NavbarChoise.findByIdAndDelete(req.params.id)
  res.status(200).json({ id, message: 'Navbar choise deleted successfully' })
})
