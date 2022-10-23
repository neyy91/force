const BigNumber = require('bignumber.js');
const DEFAULT = require('../../constants/constants')

class GoodsService {
    constructor(fastify) {
        this.fastify = fastify
    }
    
    _randomPrice () {
		const loadNs = process.hrtime();
		const loadMs = new Date().getTime();
		let diffNs = process.hrtime(loadNs);
		return parseInt(BigNumber(loadMs).times(1e6).plus(BigNumber(diffNs[0]).times(1e9).plus(diffNs[1])).toString().slice(-4)) ;
	}

    async Buy(userID = 1) {
        const client = await this.fastify.pg.connect()
        const prepareRedisKey = `${DEFAULT.USER_INFO}${userID}`;

        try {
            let price = this._randomPrice();
            let query = '';

            let userInfo = await this.fastify.RedisGetDataByKey(
                prepareRedisKey
            )

            if (!userInfo) {
                query = `SELECT id, nickname, balance FROM users WHERE id=$1`
                let userReq = await client.query(query, [userID] )
                if (!userReq || userReq.rows.length == 0 ) throw 'User not exist'

                userInfo = userReq.rows.find(x => x.id == userID)
            }

            if (userInfo.balance < price) throw `Low balance. Price: ${price}, Balance: ${userInfo.balance}`
            
            query = `UPDATE users SET balance=$1 WHERE id=$2`

            userInfo.balance = BigNumber(userInfo.balance).minus(price).toNumber()

            await client.query(query, [userInfo.balance, userID] )

            await this.fastify.RedisExpireSet(
                prepareRedisKey, userInfo
            )
            
            return {
                success : true
            }
        } catch (e) {
            throw e
        } finally {
            client.release()
        }

    }

}

module.exports = GoodsService
