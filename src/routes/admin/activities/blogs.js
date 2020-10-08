const express = require('express')
const router = express.Router()

const adminAuth = require('./../../../middleware/adminAuth')
const Blog = require('../../../models/blog')
const logger = require('../../../services/logger')
const { clearCache } = require('../../../services/cache')

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({})
            .select({ body: 0 })

        res.send(blogs)
    } catch (e) {
        logger.error(e.message)
        res.status(500).send()
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const blog = await Blog.findById(id)

        if (!blog)
            res.status(404).send({message: "Blog Not Found"})

        res.send(blog)
    } catch (e) {
        logger.error(e.message)
        res.status(500).send()
    }
})

router.post('/', adminAuth, async (req, res) => {
    try {
        const blog = new Blog(req.body)

        await blog.save()
        
        res.status(201).send(blog)
    } catch (e) {
        logger.error(e.message)
        res.status(500).send()
    }
})

router.delete('/:id', adminAuth, async (req, res) => {
    const {id} = req.params
    try {
        const blog = await Blog.findByIdAndDelete(id)

        if (!blog)
            res.status(404).send({message: "Blog Not Found"})

        res.send(blog)
    } catch (e) {
        logger.error(e.message)
        res.status(500).send()
    }
})

router.patch('/:id', adminAuth, async (req, res) => {
    const updateKeys = Object.keys(req.body)
    const validUpdateKeys = ['body', 'title', 'headerImg', 'subTitle']
    const isValidUpdate = updateKeys.every(key => validUpdateKeys.includes(key))
    
    if (!isValidUpdate)
        return res.status(400).send({ message: 'Invalid Update' })

    try {
        const blog = await Blog.findOne({ _id: req.params.id })

        if (!blog)
            return res.status(404).send({ message: 'Blog Not Found' })
        
        updateKeys.forEach(key => blog[key] = req.body[key])
        
        await blog.save()

        const resData = await Blog.findOne({ _id: req.params.id })
        
        res.send(resData)
    } catch (e) {
        logger.error(e.message)
        res.status(500).send()
    }
})

module.exports = router