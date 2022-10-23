'use strict'

const path = require('path')
require('dotenv').config()
const AutoLoad = require('@fastify/autoload')
const fp = require('fastify-plugin')

const config = require('./config/index')
const ProfileService = require('./controllers/profile/service')
const GoodsService = require('./controllers/goods/service')
const ItemsService = require('./controllers/items/service')

const SchemaResponse = require('./schemas/response')

async function connectToDatabases(fastify) {
  fastify
    .register(require('@fastify/redis'), config.redisOptions)
    .register(require('@fastify/postgres'), config.psqlOptions)
}

module.exports = async function (fastify, opts) {
  fastify.decorate('conf', config)
  fastify.register(fp(connectToDatabases))
  fastify.register(require('@fastify/swagger'))
  fastify.register(require('@fastify/swagger-ui'), config.swaggerOption)
  fastify.register(require('fastify-axios'))

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'controllers'),
    options: Object.assign({}, opts)
  })

  const profileService = new ProfileService(fastify)
  fastify.decorate('profileService', profileService)

  const itemsService = new ItemsService(fastify)
  fastify.decorate('itemsService', itemsService)

  const goodsService = new GoodsService(fastify)
  fastify.decorate('goodsService', goodsService)

  new SchemaResponse(fastify)

}