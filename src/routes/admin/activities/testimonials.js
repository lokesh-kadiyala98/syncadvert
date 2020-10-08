const express = require('express')
const router = express.Router()

const adminAuth = require('../../../middleware/adminAuth')
const Testimonial = require('../../../models/testimonial')
const logger = require('../../../services/logger')
const { clearCache } = require('../../../services/cache')
const { deleteUpload } = require('./uploads')


router.post('/', adminAuth, async (req, res) => {
    const testimonial = new Testimonial(req.body)
    try {
        await testimonial.save()
                
        res.status(201).send(testimonial)
        
        clearCache(JSON.stringify({"collection":"testimonials"}))
    } catch (e) {
        logger.error(e.message)
        res.status(500).send()
    }
})

router.get('/', async (req, res) => {
    try {
        const testimonials = await Testimonial.find({})

        res.send(testimonials)
    } catch (e) {
        logger.error(e.message)
        res.status(500).send()
    }
})

router.delete('/:id', adminAuth, async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id)

        if (!testimonial)
            res.status(404).send({ message: 'Testimonail Not Found'})

        deleteUpload(testimonial.img)
        
        res.send(testimonial)
    } catch (e) {
        logger.error(e.message)
        res.status(500).send()
    }
})

module.exports = router