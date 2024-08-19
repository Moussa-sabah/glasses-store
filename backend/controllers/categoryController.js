

const asyncHandler = require('express-async-handler')
const { Category, validateUpdateCategory, validateCreateCategory } = require('../models/Category')
const { Product } = require('../models/Product')


// Create category ---------- /api/category  [Admin]
module.exports.createCategoryCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateCategory(req.body)

  if (error) {
    return res.status(401).json({ message: error.details[0].message })
  }
  const category = await Category.create({
    title: req.body.title,
    navbarChoise: req.body.navbarChoise
  })

  res.status(201).json(category)

})


// Get all categories ---------- /api/category  
module.exports.getAllCategoryCtrl = asyncHandler(async (req, res) => {
  const categories = await Category.find()
  res.status(200).json(categories)
})


// Get category ---------- /api/category/:id  
module.exports.getOneCategoryCtrl = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (!category) {
    return res.status(404).json({ message: 'category not found' })
  }

  res.status(200).json(category)
})


// update catgory ------------ /api/category/:id  [Admin]
module.exports.updateCategoryCtrl = asyncHandler(async (req, res) => {

  const { error } = validateUpdateCategory(req.body)
  if (error) {
    return res.status(401).json({ message: error.details[0].message })
  }

  const updateCategory = await Category.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
    }
  }, { new: true })

  if (!updateCategory) {
    return res.status(404).json({ message: 'Not found category' })
  }


  res.status(200).json(updateCategory)
})



// Delete category ----------- /api/category/:id   [Admin]
module.exports.deleteCategoryCtrl = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id).populate('navbarChoise')
  if (!category) {
    return res.status(404).json({ message: 'Not found category' })
  }

  await Product.deleteMany({ navbarChoise: category.navbarChoise.title, category: category.title })
  await Category.findByIdAndDelete(req.params.id)

  res.status(200).json({ id: category._id, message: 'Category deleted successfully' })
})



