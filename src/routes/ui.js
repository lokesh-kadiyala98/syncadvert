const express = require('express')
const router = express.Router()

const CTA = require('../models/cta')

router.get('/cta', async (req, res) => {
    try {
        const cta = await CTA.find({}).cache()
        
        res.send(cta)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router