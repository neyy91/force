class ItemsService {
    constructor(fastify) {
        this.fastify = fastify
    }

    async _getSkinportPriceInfo(tradable = 0){
        return (await this.fastify.axios.get(`https://api.skinport.com/v1/items?app_id=730&tradable=${tradable}`)).data
    }

    async TradablePriceInfo() {
        try {
            const itemsTradable = await this._getSkinportPriceInfo(1);
            const itemsNotTradable = await this._getSkinportPriceInfo();
    
            itemsNotTradable.forEach(element => {
                element.min_price = {
                    tradable: itemsTradable.find(info => info.market_hash_name == element.market_hash_name).min_price,
                    not_tradable: element.min_price
                }
            });
    
            return itemsNotTradable;
        } catch (error) {
            throw error && error.response?.data?.errors[0]?.message
        }


    }
}

module.exports = ItemsService