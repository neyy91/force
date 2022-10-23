const buy = {
    description: 'api for buy item',
    tags: ['goods'],
    querystring: {
      type: 'object',
      required: ['id'],
      properties: {
        id: {
          type: 'string',
        }
      },
      additionalProperties: false
    },
    response: {
    //     201: 'responseOk#'
    }
  }

module.exports = {
    buy
}