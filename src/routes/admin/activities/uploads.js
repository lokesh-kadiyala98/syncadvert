const express = require('express')
const router = express.Router()
const uuid = require('uuid')
const AWS = require('aws-sdk')

const adminAuth = require('./../../../middleware/adminAuth')
const logger = require('./../../../services/logger')

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    signatureVersion: 'v4',
    region: 'ap-south-1'
})

router.get('/signed_url', adminAuth, async (req, res) => {
    try {
        const fileType = req.query.fileType
        const nameSpace = req.query.nameSpace

        let key 
        if (nameSpace)
            key = `${nameSpace}/${uuid.v1()}.${fileType.split('/')[1]}`
        else
            key = `${uuid.v1()}.${fileType.split('/')[1]}`

        const signedURL = await s3.getSignedUrlPromise('putObject', {
            Bucket: 'sync-advert',
            ContentType: fileType,
            Key: key
        })

        res.send({ filePath: key, signedURL })
    } catch (e) {
        logger.error(e.message)
        res.status(500).send()
    }
})

router.delete('/', adminAuth, async (req, res) => {
    deleteUpload(req.query.Key)
    res.send()
})

function deleteUpload(Key) {
    const Objects = [{Key}]
    
    const params = {
        Bucket: 'sync-advert',
        Delete: {
            Objects,
            Quiet: false
        }
    }

    s3.deleteObjects(params, (err, data) => {
        if (err)
            logger.error(err.message, Key)
    })
}

module.exports = {
    router,
    deleteUpload
}