'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  fastify.decorate('pluginForTest', function () {
    return 'expected answer'
  })
})
