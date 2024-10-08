



const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const cloudinaryUploadImage = async (fileToUpload) => {
  try {
    const date = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: 'auto'
    })
    return date
  } catch (error) {
    console.log(error)
    throw new Error('Internal Server Error (cloudinary)');
  }
}


const cloudinaryRemoveImage = async (imagePublicId) => {
  try {
    const result = await cloudinary.uploader.destroy(imagePublicId)
    return result
  } catch (error) {
    console.log(error)
    throw new Error('Internal Server Error (cloudinary)');
  }
}

const cloudinaryRemoveMultipleImages = async (publicIdsArray) => {
  try {
    const result = await cloudinary.v2.api.delete_resources(publicIdsArray)
    return result
  } catch (error) {
    console.log(error)
    throw new Error('Internal Server Error (cloudinary)');
  }
}


module.exports={
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
  cloudinaryRemoveMultipleImages
}