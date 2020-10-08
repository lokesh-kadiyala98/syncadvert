const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    path: {
        type: String,
        required: [true, 'Please upload an Image'],
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        default: '5f74969346758f507c23c6d7'
    }
}, {
    timestamps: true
})

const Image = new mongoose.model('Image', imageSchema)

module.exports = Image