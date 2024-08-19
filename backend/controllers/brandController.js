

const asyncHandler = require('express-async-handler')
const { Brand, validateCreateBrand, validateUpdateBrand } = require('../models/Brand')

// Create brand ---------------- /api/brand
module.exports.createBrandCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateBrand(req.body)
  if (error) {
    return res.status(401).json({ message: error.details[0].message })
  }
  let brand = await Brand.findOne({ title: req.body.title })
  if (brand) {
    return res.status(401).json({ message: 'Brand is already exist' })
  }

  brand = await Brand.create({
    title: req.body.title
  })

  res.status(201).json(brand)
})

// Get all brands ---------------- /api/brand
module.exports.getAllBrandsCtrl = asyncHandler(async (req, res) => {
  const brands = await Brand.find().populate('categories')
  res.status(200).json(brands)
})


// Get one brand ---------------- /api/brand/:id
module.exports.getOneBrandCtrl = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id).populate('categories')
  if (!brand) {
    return res.status(404).json(brand)
  }
  res.status(200).json(brand)
})

// Update brand ------------- /api/brand/:id
module.exports.updateBrandCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateBrand(req.body)
  if (error) {
    return res.status(401).json({ message: error.details[0].message })
  }

  const updateBrand = await Brand.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title
    }
  }, {
    new: true
  })

  if (!updateBrand) {
    return res.status(404).json({ message: 'Not found brand' })
  }
  res.status(200).json(updateBrand)
})

// Delete brand ------------- /api/brand/:id
module.exports.deleteBrandCtrl = asyncHandler(async (req, res) => {

  const brand = Brand.findById(req.params.id)
  
  if (!brand) {
    return res.status(404).json({ message: 'Not found brand' })
  }

  await Brand.findByIdAndDelete(req.params.id)
  res.status(200).json({ id:brand._id, message: 'Brand deleted successfully' })
})
