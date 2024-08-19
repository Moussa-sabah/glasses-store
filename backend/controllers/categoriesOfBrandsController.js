



const asyncHandler = require('express-async-handler')
const { CategoriesOfBrands, validateUpdateCategory, validateCreateCategory } = require('../models/CategoriesOfBrands')


// Create category ---------- /api/categoriesOfBrands  [Admin]
module.exports.createCategoryCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateCategory(req.body)

  if (error) {
    return res.status(401).json({ message: error.details[0].message })
  }
  const category = await CategoriesOfBrands.create({
    title: req.body.title,
    brand: req.body.brand
  })

  res.status(201).json(category)

})


// Get all categories ---------- /api/categoriesOfBrands  
module.exports.getAllCategoryCtrl = asyncHandler(async (req, res) => {
  const categories = await CategoriesOfBrands.find()
  res.status(200).json(categories)
})


// Get category ---------- /api/categoriesOfBrands/:id  
module.exports.getOneCategoryCtrl = asyncHandler(async (req, res) => {
  const category = await CategoriesOfBrands.findById(req.params.id)

  if (!category) {
    return res.status(404).json({ message: 'category not found' })
  }

  res.status(200).json(category)
})


// update catgory ------------ /api/categoriesOfBrands/:id  [Admin]
module.exports.updateCategoryCtrl = asyncHandler(async (req, res) => {

  const { error } = validateUpdateCategory(req.body)
  if (error) {
    return res.status(401).json({ message: error.details[0].message })
  }

  const updateCategory = await CategoriesOfBrands.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
    }
  }, { new: true })

  if (!updateCategory) {
    return res.status(404).json({ message: 'Not found category' })
  }


  res.status(200).json(updateCategory)
})



// Delete category ----------- /api/categoriesOfBrands/:id   [Admin]
module.exports.deleteCategoryCtrl = asyncHandler(async (req, res) => {
  const category = await CategoriesOfBrands.findById(req.params.id)
  if (!category) {
    return res.status(404).json({ message: 'Not found category' })
  }

  await CategoriesOfBrands.findByIdAndDelete(req.params.id)

  res.status(200).json({ message: 'Category deleted successfully' })
})



