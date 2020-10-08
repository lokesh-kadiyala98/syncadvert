const express = require('express')
const router = express.Router()

const Admin = require('./../../models/admin')
const adminAuth = require('./../../middleware/adminAuth')
const {deleteUpload} = require('./../admin/activities/uploads')

const { sendWelcomeEmail } = require('./../../emails/account')
const logger = require('./../../services/logger')

router.post('/register', async (req, res) => {
    const admin = new Admin(req.body)
    try {
        await admin.save()

        sendWelcomeEmail(admin.email, admin.name)

        const token = await admin.generateAuthToken()
        
        res.status(201).send({ admin, token })
    } catch(e) {
        logger.error(e.message)
        res.status(500).send()
    }
})

router.post('/login', async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(req.body.email, req.body.password)

        if (!admin)
            return res.status(404).send()

        const token = await admin.generateAuthToken()

        res.send({ token })
    } catch (e) {
        logger.error(e.message)
        if (e.message)
            res.status(400).send(e.message)
        else
            res.status(500).send()
    }
})

router.get('/validate_token', adminAuth, async (req, res) => {
    res.send()
})

router.get('/profile', adminAuth, (req, res) => {
    try {
        res.send(req.admin)
    } catch(e) {
        logger.error(e.message)
        res.status(500).send()
    }
})

router.patch('/profile', adminAuth, async (req, res) => {
    if (!req.body.validationPassword)
        return res.status(400).send({ message: 'Password Required' })

    const updateKeys = Object.keys(req.body)
    const validUpdateKeys = ['email', 'password', 'name', 'validationPassword', 'img']
    const isValidUpdate = updateKeys.every(key => validUpdateKeys.includes(key))
    const isUpdateImage = updateKeys.includes('img')
    let imgKey = ''

    if (isUpdateImage)
        imgKey = req.admin.img
        
    if (!isValidUpdate)
        return res.status(400).send({ message: 'Invalid Update' })

    try {
        const bcrypt = require('bcryptjs')

        const admin = req.admin

        if (!admin)
            return res.status(404).send({ message: 'User not found' })
        
            
        const isMatch = await bcrypt.compare(req.body.validationPassword, admin.password)

        if (!isMatch)
            return res.status(400).send({ message: 'Incorrect Password' })
        
        updateKeys.forEach(key => admin[key] = req.body[key])

        await admin.save()

        deleteUpload(imgKey)
        res.send(admin)
    } catch (e) {
        logger.error(e.message)
        res.status(500).send()
    }
})

router.get('/logout', adminAuth, async (req, res) => {
    try {
        req.admin.tokens = req.admin.tokens.filter(token => token.token !== req.token)

        await req.admin.save()

        res.send(req.admin)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/logout_all_devices', adminAuth, async (req, res) => {
    try {
        const admin = req.admin

        admin.tokens = []

        await admin.save()

        res.send(req.admin)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router