const express = require('express')
const router = express.Router()

const CTA = require('../../../models/cta')
const { clearCache } = require('../../../services/cache')
const adminAuth = require('./../../../middleware/adminAuth')
const logger = require('../../../services/logger')

router.post('/cta', adminAuth, async (req, res) => {
    // const cta = new CTA(req.body)
    // try {
    //     await cta.save()

    //     res.status(201).send(cta)
    // } catch (e) {
    //     res.status(500).send()
    // }

    res.status(400).send('Restricted Operation!!')
})

router.patch('/', adminAuth, async (req, res) => {
    const updateKeys = Object.keys(req.body)
    const validUpdateKeys = ['email', 'whatsapp', 'youtube', 'facebook', 'instagram']
    const isValidUpdate = updateKeys.every(key => validUpdateKeys.includes(key))
    
    if (!isValidUpdate)
        return res.status(400).send({ message: 'Invalid Update' })

    try {
        const cta = await CTA.findOne({})

        updateKeys.forEach(key => cta[key] = req.body[key])
        
        await cta.save()

        res.send(cta)
        
        clearCache(JSON.stringify({"collection":"ctas"}))
    } catch (e) {
        const str = e.message 
        const isMatch = str.match(/CTA validation failed/g)
        if (isMatch)
            return res.status(400).send({ message: e.message })

        logger.error(e.message)
        res.status(500).send()
    }
})

module.exports = router