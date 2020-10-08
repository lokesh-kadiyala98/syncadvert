const mongoose = require('mongoose')
const validator = require('validator')

const teamMemberScema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Please give the Name'],
        trim: true
    },
    role: {
        type: String,
        required: [true, 'Please enter the role'],
        trim: true
    },
    img: {
        type: String
    },
    socialLinks: [{
        facebook: {
            type: String
        },
        instagram: {
            type: String
        },
        twitter: {
            type: String
        }
    }]
}, {
    timestamps: true
})

const TeamMember = new mongoose.model('TeamMember', teamMemberScema)

module.exports = TeamMember