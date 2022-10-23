const {
    buy: buySchema,
  } = require('./schemas')


module.exports = function (fastify, opts, next) {
    fastify.get('/buy', {
        schema: buySchema
    }, buy)
    next()
}

module.exports[Symbol.for('plugin-meta')] = {
    decorators: {
        fastify: [
            'goodsService'
        ]
    }
}

async function buy(req, reply) {
    return this.goodsService.Buy(req.query && req.query.id)
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