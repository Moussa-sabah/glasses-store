
const asyncHandler = require('express-async-handler')
const { WebReview, validateCreateWebReview, validateUpdateWebReview } = require('../models/WebReview')


// Create web review ---------- /api/web-review
module.exports.createWebReviewCtrl = asyncHandler(async (req, res) => {

  const { error } = validateCreateWebReview(req.body)
  if (error) {
    return res.status(401).json({ message: error.details[0].message })
  }

  const webReview = await WebReview.create({
    reviewTitle: req.body.reviewTitle,
    reviewText: req.body.reviewText,
    user: req.user.id
  })

  res.status(201).json(webReview)

})

// Get all web reviews ----------- /api/web-review
module.exports.getAllWebReviewsCtrl = asyncHandler(async (req, res) => {
  const webReviews = await WebReview.find().populate('user')
  res.status(200).json(webReviews)
})


// Get one web review ------------ /api/web-review/:id
module.exports.getOneWebReviewCtrl = asyncHandler(async (req, res) => {
  const review = await WebReview.find(req.params.id)
  res.status(200).json(review)
})

// Update web review --------- /api/web-review/:id   [user himself]
module.exports.updateWebReviewCtrl = asyncHandler(async (req, res) => {

  const { error } = validateUpdateWebReview(req.body)
  if (error) {
    return res.status(401).json({ message: error.details[0].message })
  }


  const updateWebReview = await WebReview.findByIdAndUpdate(req.params.id, {
    $set: {
      reviewTitle: req.body.reviewTitle,
      reviewText: req.body.reviewText
    }
  }, { new: true })


  if (!updateWebReview) {
    return res.status(404).json({ message: 'Not found review' })
  }

  if (req.user.id !== updateWebReview.user._id.toString()) {
    return res.status(403).json({ message: 'Not allowed, Only user himself' })
  }
  const webReviews = await WebReview.find()

  res.status(200).json(webReviews)

})

// Delete web review -------- /api/web-review/:id   [admin,user himself]
module.exports.deleteWebReviewCtrl = asyncHandler(async (req, res) => {
  const webReview = await WebReview.findById(req.params.id)

  if (!webReview) {
    return res.status(404).json({ message: 'Not found review' })
  }

  await WebReview.findByIdAndDelete(req.params.id)

  const reviews = await WebReview.find().populate('user')

  res.status(200).json(reviews)
})


