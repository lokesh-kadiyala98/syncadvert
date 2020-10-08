const mongoose = require('mongoose')
const validator = require('validator')

const CTAScehma = new mongoose.Schema({
    whatsapp: {
        type: Number,
        validate: function(value) {
            if (value && value.toString().length !== 12)
                throw new Error('Please provide a valid Contact Number')
        } 
    },
    email: {
        type: String,
        trim: true,
        validate: function(value) {
            if (value && !validator.isEmail(value))
                throw new Error('Please provide a valid Email')
        }
    },
    youtube: {
        type: String,
        trim: true,
        validate: function(value) {
            if (value && !validator.isURL(value))
                throw new Error('Seems like YouTube URL is not valid')
        }
    },
    facebook: {
        type: String,
        trim: true,
        validate: function(value) {
            if (value && !validator.isURL(value))
                throw new Error('Seems like Facebook URL is not valid')
        }
    },
    instagram: {
        type: String,
        trim: true,
        validate: function(value) {
            if (value && !validator.isURL(value))
                throw new Error('Seems like Instagram URL is not valid')
        }
    }
})

const CTA = new mongoose.model('CTA', CTAScehma)

module.exports = CTA