


const express = require('express')
const app = express()
const connectToDB = require('./config/connectToDB')
require('dotenv').config()
const cors = require('cors')

// config/connectToDB
connectToDB()

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000'
}))


app.use('/api/auth', require('./routes/authRoute'))
app.use('/api/users', require('./routes/userRoute'))
app.use('/api/navbar-choise', require('./routes/navbarChoiseRoute'))
app.use('/api/category', require('./routes/categoryRoute'))
app.use('/api/categoriesOfBrands',require('./routes/categoriesOfBrandsRoute'))
app.use('/api/product', require('./routes/productRoute'))
app.use('/api/web-review', require('./routes/webReviewRoute'))
app.use('/api/product-review', require('./routes/productReviewRoute'))
app.use('/api/brand', require('./routes/brandRoute'))

const port = process.env.PORT || 7000
app.listen(port, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} and mode on port ${port}`)
})