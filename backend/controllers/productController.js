

const asyncHandler = require('express-async-handler')
const { Product, validateCreateProduct, validateUpdateProduct } = require('../models/Product')
const { User } = require('../models/User')
const path = require('path')
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require('../utils/cloudinary')
const fs = require('fs')

// Create product ------------ /api/product      [Admin]
module.exports.createProductCtrl = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(401).json({ message: 'Please select an image' })
  }
  const { error } = validateCreateProduct(req.body)
  if (error) {
    return res.status(401).json({ message: error.details[0].message })
  }

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`)

  const result = await cloudinaryUploadImage(imagePath)

  const product = await Product.create({
    title: req.body.title,
    navbarChoise: req.body.navbarChoise,
    category: req.body.category,
    oldPrice: req.body.oldPrice,
    newPrice: req.body.newPrice,
    brand: req.body.brand,
    image: {
      url: result.secure_url,
      publicId: result.public_id,
    }
  })

  res.status(201).json(product)
  fs.unlinkSync(imagePath)
})


// Get all products --------- /api/product/   
module.exports.getAllProductsCtrl = asyncHandler(async (req, res) => {
  const { navbarChoise, brand, category } = req.query
  let products
  if (navbarChoise && !category && !brand) {
    products = await Product.find({ navbarChoise }).sort({ createdAt: -1 })
    return res.status(200).json(products)
  }

  if (navbarChoise && category) {
    products = await Product.find({ navbarChoise, category }).sort({ createdAt: -1 })
    return res.status(200).json(products)
  }


  if (brand && !navbarChoise && !category) {
    products = await Product.find({ brand }).sort({ createdAt: -1 })
    return res.status(200).json(products)
  }
  if (brand && category && !navbarChoise) {
    products = await Product.find({ brand, category }).sort({ createdAt: -1 })
    return res.status(200).json(products)
  }
  else {
    products = await Product.find().sort({ createdAt: -1 })
    return res.status(200).json(products)
  }

})


// Get recent add products --------- /api/product/recent-add/home   
module.exports.getRecentAddProductsCtrl = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 }).skip(0).limit(4)
  res.status(200).json(products)
})

// Get one product --------- /api/product/:id   
module.exports.getOneProductCtrl = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id).populate('reviews')

  if (!product) {
    return res.status(404).json({ message: 'Not fount product' })
  }


  res.status(201).json(product)
})


// Update product --------- /api/product/:id
module.exports.updateProductCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateProduct(req.body)
  if (error) {
    return res.status(401).json({ message: error.details[0].message })
  }

  const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      navbarChoise: req.body.navbarChoise,
      category: req.body.category,
      oldPrice: req.body.oldPrice,
      newPrice: req.body.newPrice,
      brand: req.body.brand
    }
  }, { new: true })

  if (!updateProduct) {
    return res.status(404).json({ message: 'Not found product' })
  }

  res.status(200).json(updateProduct)

})


// Delete product --------- /api/product/:id
module.exports.deleteProductCtrl = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id)

  if (!product) {
    return res.status(404).json({ message: 'Not fount product' })
  }

  await Product.findByIdAndDelete(req.params.id)
  await cloudinaryRemoveImage(product.image.publicId)

  res.status(200).json({ id: product._id, message: 'Product has been deleted successfully' })

})

// Update product image --------- /api/product/update-image/:id
module.exports.updateProductImageCtrl = asyncHandler(async (req, res) => {

  if (!req.file) {
    return res.status(401).json({ message: 'Please select an image' })
  }

  const product = await Product.findById(req.params.id)

  if (!product) {
    return res.status(404).json({ message: 'Not fount product' })
  }


  await cloudinaryRemoveImage(product.image.publicId)


  const imagePath = path.join(__dirname, `../images/${req.file.filename}`)
  const resulte = await cloudinaryUploadImage(imagePath)

  const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
    $set: {
      image: {
        url: resulte.secure_url,
        publicId: resulte.public_id
      }
    }
  }, { new: true }).select('image')

  res.status(201).json(updateProduct)
  fs.unlinkSync(imagePath)
})

// toggle product to favorites  ------------ /api/product/add-favorites/:id
module.exports.toggleToFavoritesCtrl = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id)
  if (!product) {
    return res.status(404).json({ message: 'Not found product' })
  }

  let user = await User.findById(req.user.id)
  if (!user) {
    return res.status(403).json({ message: 'Not found user' })
  }
  let findInFavorite = user.favorites.find(f => f?.id === req.params.id)

  if (!findInFavorite) {
    user.favorites.push(product)

    await User.findByIdAndUpdate(req.user.id, {
      $set: {
        favorites: user.favorites
      }
    }, { new: true })


    return res.status(200).json(user.favorites)
  }


  let filterFavorites = user.favorites.filter(f => f.id !== req.params.id)
  await User.findByIdAndUpdate(req.user.id, {
    $set: {
      favorites: filterFavorites
    }
  }, { new: true })

  res.status(200).json(filterFavorites)

}

)

// toggle product to cart  ------------ /api/product/add-cart/:id
module.exports.toggleToCartCtrl = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id)
  if (!product) {
    return res.status(404).json({ message: 'Not found product' })
  }

  const user = await User.findById(req.user.id)
  const findInCart = user.cart.find(c => c.id === req.params.id)

  if (!findInCart) {
    user.cart.push(product)
    await User.findByIdAndUpdate(req.user.id, {
      $set: {
        cart: user.cart
      }
    }, { new: true })

    return res.status(200).json(user.cart)
  }

  let filterCart = user.cart.filter(c => c.id !== req.params.id)

  await User.findByIdAndUpdate(req.user.id, {
    $set: {
      cart: filterCart
    }
  }, { new: true })

  res.status(200).json(filterCart)
})

// delete product from cart ----------- /api/product/delete-from-cart/:id
module.exports.deleteProductFromCartCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  let filterCart = user.cart.filter(p => p.id !== req.params.id)

  await User.findByIdAndUpdate(req.user.id, {
    $set: {
      cart: filterCart
    }
  }, { new: true })
  res.status(200).json({ message: 'Product deleted successfully' })
})

// User add to favorites --------- /api/product/users-favorites/:id
module.exports.usersAddToFavoritesCtrl = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id)
  if (!product) {
    return res.status(404).json({ message: 'Not foun product' })
  }

  const user = await User.findById(req.user.id)
  let findInFavorites = user.favorites.find(f => f.id === req.params.id)

  if (findInFavorites) {
    product.usersAddToFavorites.push(user.id)
    await Product.findByIdAndUpdate(req.params.id, {
      $set: {
        usersAddToFavorites: product.usersAddToFavorites
      }
    }, { new: true })

    return res.status(200).json(product.usersAddToFavorites)
  }

  let usersFilter = product.usersAddToFavorites.filter(u => u.id !== req.user.id)
  await Product.findByIdAndUpdate(req.params.id, {
    $set: {
      usersAddToFavorites: usersFilter
    }
  }, { new: true })

  res.status(200).json(usersFilter)
})

// User add to favorites --------- /api/product/users-cart/:id
module.exports.usersAddToCartCtrl = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id)
  if (!product) {
    return res.status(404).json({ message: 'Not found product' })
  }

  const user = await User.findById(req.user.id)
  let findInCart = user.cart.find(c => c.id === req.params.id)

  if (findInCart) {
    product.usersAddToCart.push(user.id)
    await Product.findByIdAndUpdate(req.params.id, {
      $set: {
        usersAddToCart: product.usersAddToCart
      }
    }, { new: true })

    return res.status(200).json(product.usersAddToCart)
  }

  let usersFilter = product.usersAddToCart.filter(u => u.id !== req.user.id)
  await Product.findByIdAndUpdate(req.params.id, {
    $set: {
      usersAddToCart: usersFilter
    }
  }, { new: true })

  res.status(200).json(usersFilter)
})

// Get all favorites ----------/api/product/favorites/favorites-products
module.exports.getAllFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    return res.status(404).json({ message: 'Not found user' })
  }
  res.status(200).json(user.favorites)
})

// Get cart ------------ /api/product/cart/cart-products
module.exports.getCartCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    return res.status(404).json({ message: 'Not found user' })
  }

  let allCartProduct = []

  for (let i = 0; i < user.cart.length; i++) {
    if (!allCartProduct.find(p => p?.id === user.cart[i].id)) {
      allCartProduct.push(user.cart[i])
    }
  }

  res.status(200).json({ allCartProduct, userCart: user.cart })
})

// add more of product to cart  ------------ /api/product/add-more-cart/:id
module.exports.addMoreOfProductToCartCtrl = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id)
  const user = await User.findById(req.user.id)
  user.cart.push(product)

  await User.findByIdAndUpdate(req.user.id, {
    $set: {
      cart: user.cart
    }
  }, { new: true })

  const filterCart = user.cart.filter(p => p.id === req.params.id)


  res.status(200).json(filterCart.length)

})

// add more of product to cart  ------------ /api/product/reduce-from-cart/:id
module.exports.reduceProductFromCartCtrl = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user.id)

  const sameProducts = user.cart.filter(p => p.id === req.params.id)
  sameProducts.pop()

  const diffrentProducts = user.cart.filter(p => p.id !== req.params.id)

  await User.findByIdAndUpdate(req.user.id, {
    $set: {
      cart: [...sameProducts, ...diffrentProducts]
    }
  }, { new: true })

  const filterCart = user.cart.filter(p => p.id === req.params.id)
  res.status(200).json(filterCart.length)
})

