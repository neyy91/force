class ResponseSchemas {
    constructor(fastify) {
        fastify.addSchema({
            $id: 'responseOk',
            type: 'object',
            properties: {
                code: {
                    type: 'number'
                },
                error: {
                    type: 'boolean'
                },
                data: {
                    type: 'object',
                    required: ['success'],
                    properties: {
                        success: {
                            type: 'boolean'
                        }
                    }
                }
            }
        })
    }
}

module.exports = ResponseSchemas