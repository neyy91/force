const DEFAULT = require('../../constants/constants')

class ProfileService {
    constructor(fastify) {
        this.fastify = fastify
    }

    async GetUser(userID) {
        const client = await this.fastify.pg.connect()
        const prepareRedisKey = `${DEFAULT.USER_INFO}${userID}`;
        let query = ''
        try {
            let userInfo = await this.fastify.RedisGetDataByKey(
                prepareRedisKey
            )

            if (!userInfo) {
                query = `SELECT * FROM users WHERE id=$1`
                let userReq = await client.query(query, [userID])
                if (!userReq || userReq.rows.length == 0) throw 'User not exist'

                userInfo = userReq.rows.find(x => x.id == userID)
            }

            return userInfo
        } catch (e) {
            throw e
        } finally {
            client.release()
        }
    }

    async CreateNextUser() {
        const client = await this.fastify.pg.connect()
        try {
            let query = `INSERT INTO public.users(
                id, nickname, balance, created_at)
                VALUES (DEFAULT , DEFAULT , DEFAULT,  DEFAULT)`;

            await client.query(query)
            return {
                success: true
            }
        } catch (e) {
            throw e
        } finally {
            client.release()
        }
    }

    async GetAllUsers() {
        const client = await this.fastify.pg.connect()
        try {

            let query = `SELECT * FROM users ORDER BY id`
            let usersInfo = await client.query(query)
            return usersInfo.rows
        } catch (e) {
            throw e
        } finally {
            client.release()
        }
    }
}

module.exports = ProfileService