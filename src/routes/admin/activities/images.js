const express = require('express')
const router = express.Router()

const Image = require('./../../../models/image')
const adminAuth = require('./../../../middleware/adminAuth')
const logger = require('../../../services/logger')
const { deleteUpload } = require('./uploads')

router.get('/', async (req, res) => {
    let {perPage, category, page} = req.query
    perPage = parseInt(perPage)
    let skipItems = Math.max(0, page) * perPage
    
    try {
        let images
        if (category) {
            images = await Image.find({ category })
                .sort([['createdAt', -1]])
                .limit(perPage)
                .skip(skipItems)
        } else {
            images = await Image.find({})
                .sort([['createdAt', -1]])
                .limit(perPage)
                .skip(skipItems)
        }
            
        res.send(images)    
    } catch (e) {
        logger.error(e.message)
        res.status(500).send()
    }
})

router.post('/', adminAuth, async (req, res) => {
    const image = new Image(req.body)
    try {
        await image.save()

        res.status(201).send(image)
    } catch (e) {
        logger.error(e.message)
        res.status(500).send()
    }
})

router.patch('/:id', adminAuth, async (req, res) => {
    const updateKeys = Object.keys(req.body)
    const validUpdateKeys = ['category']
    const isValidUpdate = updateKeys.every(key => validUpdateKeys.includes(key))
    
    if (!isValidUpdate)
        return res.status(400).send({ message: 'Invalid Update' })

    try {
        const image = await Image.findOne({ _id: req.params.id })

        if (!image)
            return res.status(404).send({ message: 'Image Not Found' })
        
        updateKeys.forEach(key => image[key] = req.body[key])

        await image.save()
        res.send(image)
    } catch (e) {
        logger.error(e.message)
        res.status(500).send()
    }
})

router.delete('/', adminAuth, async (req, res) => {
    try {
        const image = await Image.findOne({ path: req.body.path })
        
        if (!image)
            return res.status(404).send({ message: 'Image Not Found' })
        
        await image.remove()
        
        res.send(image)
        
        deleteUpload(image.path)
    } catch (e) {
        const str = e.message 
        const isMatch = str.match(/Pinned to/g)
        if (isMatch)
            return res.status(400).send({ message: e.message })
        
        logger.error(e.message)
        res.status(500).send()
    }
})

module.exports = router