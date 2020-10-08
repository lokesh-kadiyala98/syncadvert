const mongoose = require('mongoose')
const redis = require('redis')
const util = require('util')

const exec = mongoose.Query.prototype.exec

const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST)
client.auth(process.env.REDIS_PASSWORD)

client.get = util.promisify(client.get)

mongoose.Query.prototype.cache = function () {
    this._cache = true

    return this
}

mongoose.Query.prototype.exec = async function() {
    if (!this._cache)
        return exec.apply(this, arguments)

    const redisKey = JSON.stringify(Object.assign({}, this.getFilter(), {
        collection: this.mongooseCollection.name
    }))
    
    const cacheValue = await client.get(redisKey)

    if (cacheValue) {
        console.log("SERVING FROM CACHE", redisKey)
        const doc = JSON.parse(cacheValue)
        
        

        //hydrating arrays and models
        return Array.isArray(doc) ? doc.map(d => new this.model(d)) : new this.model(doc)  
    }

    const result = await exec.apply(this, arguments)
    client.set(redisKey, JSON.stringify(result))

    return result
}

module.exports = {
    clearCache(haskey) {
        client.del(haskey)
    }
}