

const mongoose = require('mongoose')

module.exports = async ()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to mongodb successfully (^_^)')
  } catch (error) {
    console.log('Connection failed to mongodb ',error)
  }
}