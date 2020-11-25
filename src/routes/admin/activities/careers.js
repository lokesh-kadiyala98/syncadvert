const express = require('express')
const router = express.Router()

const Career = require('../../../models/career')
const adminAuth = require('./../../../middleware/adminAuth')
const { deleteUpload } = require('./../activities/uploads')
const logger = require('../../../services/logger')
const { clearCache } = require('../../../services/cache')

router.post('/', adminAuth, async (req, res) => {
    try {
        const career = new Career(req.body)

        await career.save()
        
        res.status(201).send(career)

        clearCache(JSON.stringify({"collection":"careers"}))
    } catch (e) {
        logger.error(e.message)
        res.status(500).send()
    }
})

router.get('/', async (req, res) => {
    try {
        const careers = await Career.find({}).cache()

        res.send(careers)
    } catch (e) {
        logger.error(e.message)
        res.status(500).send()
    }
})

router.delete('/:id', adminAuth, async (req, res) => {
    const {id} = req.params
    try {
        const career = await Career.findByIdAndDelete(id)

        if (!career)
            return res.status(404).send()

        deleteUpload(career.flyer)

        res.send(career)
        
        clearCache(JSON.stringify({"collection":"careers"}))
    } catch (e) {
        logger.error(e.message)
        res.status(500).send()
    }
})

module.exports = router