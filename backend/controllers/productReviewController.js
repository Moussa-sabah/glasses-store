



const asyncHandler = require('express-async-handler')
const { ProductReview, validateCreateProductReview, validateUpdateProductReview } = require('../models/productReview')


// Create product review ---------- /api/product-review
module.exports.createProductReviewCtrl = asyncHandler(async (req, res) => {

  const { error } = validateCreateProductReview(req.body)
  if (error) {
    return res.status(401).json({ message: error.details[0].message })
  }

  const productReview = await ProductReview.create({
    reviewTitle: req.body.reviewTitle,
    reviewText: req.body.reviewText,
    user: req.user.id,
    product: req.body.product
  })

  res.status(201).json(productReview)

})

// Get all product reviews ----------- /api/product-review
module.exports.getAllProductReviewsCtrl = asyncHandler(async (req, res) => {
  const productReviews = await ProductReview.find().populate('user')
  res.status(200).json(productReviews)
})

module.exports.getOneProdectReviewCtrl = asyncHandler(async (req, res) => {
  const review = await ProductReview.findById(req.params.id)
  if (!review) {
    return res.status(404).json({ message: 'Not found review' })
  }
  res.status(200).json(review)
})

// Update product review --------- /api/product-review/:id   [user himself]
module.exports.updateProductReviewCtrl = asyncHandler(async (req, res) => {

  const { error } = validateUpdateProductReview(req.body)
  if (error) {
    return res.status(401).json({ message: error.details[0].message })
  }


  const updateproductReview = await ProductReview.findByIdAndUpdate(req.params.id, {
    $set: {
      reviewTitle: req.body.reviewTitle,
      reviewText: req.body.reviewText
    }
  }, { new: true })

  if (!updateproductReview) {
    return res.status(404).json({ message: 'Not found review' })
  }

  if (req.user.id !== updateproductReview.user._id.toString()) {
    return res.status(403).json({ message: 'Not allow only user himself can' })
  }

  const reviews = await ProductReview.find({ product: updateproductReview.product })
  res.status(200).json(reviews)

})

// Delete product review -------- /api/product-review/:id   [admin,user himself]
module.exports.deleteProductReviewCtrl = asyncHandler(async (req, res) => {
  const productReview = await ProductReview.findById(req.params.id)

  if (!productReview) {
    return res.status(404).json({ message: 'Not found review' })
  }

  await ProductReview.findByIdAndDelete(req.params.id)

  const reviews = await ProductReview.find({ product: productReview.product }).populate('user')

  res.status(200).json(reviews)
})


// Get reviews of product ---------- api/product-review/reviews/:id
module.exports.getReviewsOfProduct = asyncHandler(async (req, res) => {
  const reviews = await ProductReview.find({ product: req.params.id }).populate('user')
  res.status(200).json(reviews)
})
