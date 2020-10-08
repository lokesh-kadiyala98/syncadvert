const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        validate: function(value) {
            if (!validator.isEmail(value))
                throw new Error('Please provide a valid Email')
        }
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Please provide Password'],
        minlength: [6, 'Password more than 6 characters is recommended']
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide Name'],
    },
    img: {
        type: String,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, { 
    timestamps: true 
})

adminSchema.methods.toJSON = function() {
    const admin = this

    const adminObj = admin.toObject()

    delete adminObj.password
    delete adminObj.tokens

    return adminObj
}

adminSchema.methods.generateAuthToken = async function() {
    const admin = this

    const token = jwt.sign({ _id: admin._id.toString() }, process.env.JWT_SECRET)

    admin.tokens = admin.tokens.concat({ token })
    await admin.save()

    return token
}

adminSchema.statics.findByCredentials = async (email, password) => {
    const admin = await Admin.findOne({ email })

    if (!admin)
        throw new Error('User not found')
    
    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch)
        throw new Error('Email & Password doesn\'t match')

    return admin
}

adminSchema.pre('save', async function(next) {
    const admin = this

    if (admin.isModified('password'))
        admin.password = await bcrypt.hash(admin.password, 8)

    next()
})

const Admin = new mongoose.model('Admin', adminSchema)

module.exports = Admin