const fp = require('fastify-plugin')
const DEFAULT = require('../constants/constants')

module.exports = fp(function (fastify, opts, next) {

    fastify.decorate('RedisExpireSet', async function (key, params) {
        const expireTime = DEFAULT.TOKET_REDIS_LIVE
        await fastify.redis.setex(key, expireTime, JSON.stringify(params))
    })

    fastify.decorate('RedisRemoveByKey', async function (key) {
        try {
            const res = await fastify.redis.del(key)
            return res
        } catch (error) {
            return error
        }
    })

    fastify.decorate('RedisGetDataByKey', async function (key) {
        try {
            const res = await fastify.redis.get(key)
            if (!res) {
                return res
            }
            return JSON.parse(res)
        } catch (error) {
            return error
        }
    })

    next()
})