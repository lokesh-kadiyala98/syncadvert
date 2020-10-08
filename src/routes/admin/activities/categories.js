const express = require('express')
const router = express.Router()

const adminAuth = require('./../../../middleware/adminAuth')
const Category = require('../../../models/category')
const logger = require('../../../services/logger')
const { clearCache } = require('../../../services/cache')

router.post('/', adminAuth, async (req, res) => {
    const category = new Category(req.body)
    try {
        await category.save()
                
        res.status(201).send(category)
    } catch (e) {
        if (e.code === 11000)
            res.status(400).send({ message: `Category '${category.name}' Exists` })
        else {   
            logger.error(e.message)
            res.status(500).send()
        }
    }
})

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({})
            .populate('pinImg', 'path gridView')
        
        res.send(categories)
    } catch (e) {
        logger.error(e.message)
        res.status(500).send()
    }
})

router.patch('/:id', async (req, res) => {
    const updateKeys = Object.keys(req.body)
    const validUpdateKeys = ['pinImg']
    const isValidUpdate = updateKeys.every(key => validUpdateKeys.includes(key))
    
    if (!isValidUpdate)
        return res.status(400).send({ message: 'Invalid Update' })

    try {
        const category = await Category.findOne({ _id: req.params.id })

        if (!category)
            return res.status(404).send({ message: 'Category Not Found' })
        
        updateKeys.forEach(key => category[key] = req.body[key])
        
        await category.save()

        const resData = await Category.findOne({ _id: req.params.id })
            .populate('pinImg', 'path gridView')
        
        res.send(resData)
    } catch (e) {
        logger.error(e.message)
        res.status(500).send()
    }
})

router.delete('/:id', adminAuth, async (req, res) => {
    const {id} = req.params
    try {
        const category = await Category.findOne({ _id: id })
    
        if (!category)
            return res.status(404).send({ message: 'Category Not Found' })

        await category.remove()

        res.send(category)
    } catch (e) {
        const str = e.message 
        const isMatch = str.match(/has pin image/g)
        if (isMatch)
            return res.status(400).send({ message: e.message })

        logger.error(e.message)
        res.status(500).send()
    }
})

// router.get('/count', async (req, res) => {
//     try {
//         const categories = await Category
//             .aggregate([
//                 {
//                     $lookup: {
//                         "from": "images",
//                         "localField": "_id",
//                         "foreignField": "category",
//                         "as": "images"
//                     }
//                 },
//                 {
//                     $lookup: {
//                         "from": "images",
//                         "localField": "pinImg",
//                         "foreignField": "_id",
//                         "as": "pinImg",
//                     }
//                 },
//                 {
//                     $unwind: "$pinImg"
//                 },
//                 { 
//                     "$project": { 
//                         "pinImg": 1,
//                         "name": 1,
//                         noOfImages: { $size: "$images" }    
//                     }
//                 }
//             ])

//         res.send(categories)
//     } catch (e) {
//         console.log(e.message)
//         logger.error(e.message)
//         res.status(500).send()
//     }
// })

module.exports = router