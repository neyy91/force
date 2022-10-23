const {
    profile: profileSchema,
    createProfile: createProfileSchema,
    profileInfo: profileInfoSchema
  } = require('./schemas')


module.exports = function (fastify, opts, next) {

    fastify.get('/:id', {
        schema: profileSchema
    }, getUserInfo)

    fastify.get('/create', {
        schema: createProfileSchema
    }, createNextUser)

    fastify.get('/all', {
        schema: profileInfoSchema
    }, allUsersInfo)

    next()
}

module.exports[Symbol.for('plugin-meta')] = {
    decorators: {
        fastify: [
            'profileService'
        ]
    }
}

async function getUserInfo(req, reply) {
    return this.profileService.GetUser(req.params && req.params.id)
        .then(res => {
            reply.send(_prapareResponse(res))
        })
}

async function createNextUser(req, reply) {
    return this.profileService.CreateNextUser()
        .then(res => {
            reply.send(_prapareResponse(res))
        })
}

async function allUsersInfo(req, reply) {
    return this.profileService.GetAllUsers()
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