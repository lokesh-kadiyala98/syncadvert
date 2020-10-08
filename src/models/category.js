const mongoose = require('mongoose')

const Image = require('./image')

const categoriesSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Category Name is required'],
        trim: true,
    },
    pinImg: {
        type: mongoose.Schema.ObjectId,
        trim: true,
        ref: 'Image'
    }
})


categoriesSchema.pre('remove', async function (next) {
    const category = this
    
    await Image.updateMany({category: category._id}, {category: '5f74969346758f507c23c6d7'})
    
    next()
})

const Category = new mongoose.model('Category', categoriesSchema)

module.exports = Category