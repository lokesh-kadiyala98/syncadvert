const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please provide Title']
    },
    subTitle: {
        type: String,
        trim: true,
        required: [true, 'Please provide Sub Heading']
    },
    headerImg: {
        type: String,
        required: [true, 'Please provide Image']      
    },
    body: {
        type: String
    }
})

const Blog = new mongoose.model('Blog', blogSchema)

module.exports = Blog