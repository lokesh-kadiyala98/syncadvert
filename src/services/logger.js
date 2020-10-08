const { createLogger, transports, format } = require('winston')
const { combine, timestamp, label, json } = format
const moment = require('moment')
require('winston-mongodb')

const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.MongoDB({
            format: combine(
                timestamp({format: 'DD-MM-YY hh:mm:ss'}),
                json()
            ),
            level: 'error',
            db: process.env.DB_URL,
            options: {
                useUnifiedTopology: true
            }
        })
    ]
})

module.exports = logger