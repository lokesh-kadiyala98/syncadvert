const mongoose = require('mongoose')

const career = new mongoose.Schema({
    role: {
        type: String,
        required: [true, 'Please provide Role']
    },
    location: {
        type: String,
        require: [true, 'Please provide Location']
    },
    flyer: {
        type: String,
        required: [true, 'Please provide Image']      
    }
})

const Career = new mongoose.model('Career', career)

module.exports = Career