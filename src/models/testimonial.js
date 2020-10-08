const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema({
    img: {
        type: String,
        required: [true, 'Image is required']
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required']
    },
    story: {
        type: String,
        trim: true,
        maxlength: [200, 'Story too long'],
        required: [true, 'Story is required']
    },
})

const Testimonial = new mongoose.model('Testimonial', testimonialSchema)

module.exports = Testimonial