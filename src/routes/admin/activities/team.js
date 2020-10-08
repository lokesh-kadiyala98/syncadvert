const express = require('express')
const router = express.Router()

const adminAuth = require('./../../../middleware/adminAuth')
const TeamMember = require('./../../../models/teamMember')
const { deleteUpload } = require('./../activities/uploads')
const { clearCache } = require('../../../services/cache')

router.get('/', async (req, res) => {
    try {
        const teamMembers = await TeamMember.find({}).cache()

        res.send(teamMembers)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/', adminAuth, async (req, res) => {
    const teamMember = new TeamMember(req.body)
    try {
        await teamMember.save()

        res.status(201).send(teamMember)
        
        clearCache(JSON.stringify({"collection":"teammembers"}))
    } catch (e) {
        if (e.code === 11000)
            return res.status(400).send({message: "Team Member with the same name exists"})
        return res.status(500).send()
    }
})

router.patch('/:id', adminAuth, async (req, res) => {
    const updateKeys = Object.keys(req.body)
    const validUpdateKeys = ['name', 'role', 'img', 'socialLinks']
    const isValidUpdate = updateKeys.every(key => validUpdateKeys.includes(key))
    const isUpdateImage = updateKeys.includes('img')
    let imgKey = ''
    
    if (!isValidUpdate)
        return res.status(400).send({ message: 'Invalid Update' })
    try {
        const teamMember = await TeamMember.findOne({ _id: req.params.id })
        
        if (!teamMember)
            return res.status(404).send({ message: 'Team Member Not Found' })
        
        if (isUpdateImage)
            imgKey = teamMember.img
        
        updateKeys.forEach(key => teamMember[key] = req.body[key])

        await teamMember.save()

        deleteUpload(imgKey)

        res.send(teamMember)

        clearCache(JSON.stringify({"collection":"teammembers"}))
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/:id', adminAuth, async (req, res) => {
    const _id = req.params.id
    try {
        const teamMemeber = await TeamMember.findByIdAndDelete({ _id })

        if (!teamMemeber)
            return res.status(404).send()

        deleteUpload(teamMemeber.img)

        res.send(teamMemeber)
        
        clearCache(JSON.stringify({"collection":"teammembers"}))
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router