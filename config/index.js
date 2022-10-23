module.exports = {
    psqlOptions: {
        connectionString: process.env.PSQL_CONNECT,
        max:300
    },
    redisOptions: {
        host: process.env.REDIS_IP || '127.0.0.1',
        port: 6379
    },
    swaggerOption: {
        swagger: {
            info: {
                title: 'Swagger force',
                description: 'Описание методов API тестового задания',
                version: '0.1.0'
            },
            host: 'localhost',
            schemes: ['https', 'http'],
            consumes: ['application/json'],
            produces: ['application/json']
        },
        exposeRoute: true,
        routePrefix:'documentation'
    }
}
