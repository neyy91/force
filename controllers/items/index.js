const {
  items: itemsSchema,
} = require('./schemas')


module.exports = function (fastify, opts, next) {
  fastify.get('/', {
    schema: itemsSchema
  }, getAllTradablePrices)
  next()
}

module.exports[Symbol.for('plugin-meta')] = {
  decorators: {
    fastify: [
      'itemsService'
    ]
  }
}

async function getAllTradablePrices(req, reply) {
  return this.itemsService.TradablePriceInfo()
    .then(res => {
      reply.send(_prapareResponse(res))
    })
}

function _prapareResponse(params, code) {
  const data = {
    code: code || 200,
    error: false,
    data: params
  }
  return data
}