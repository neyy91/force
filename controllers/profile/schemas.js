const profile = {
    tags: ['profile'],
    description: 'profile info',
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: {
                type: 'number'
            }
        },
        additionalProperties: false
    },
}

const createProfile = {
    tags: ['profile'],
    description: 'create user with next id'
}

const profileInfo = {
    tags: ['profile'],
    description: 'all profiles'
}

module.exports = {
    profile,
    createProfile,
    profileInfo
  }