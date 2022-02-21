//  Monkey League specific queries
import { getAuctionList, getToken } from './magic-eden-service'
import listings from '../data/listings.json'
import data from '../data/monkey.json'

const monkeyLeagueSymbol = 'MonkeyBall'

/*
 * Retrieve 20 for sale Monkey League NFTs from Magic Eden
 */
const getMonkeysForSaleXXX = async (offset = 0) => {
    let monkeys = await getAuctionList(monkeyLeagueSymbol)
    monkeys = monkeys.map(async (monkey) => {
        const details = await getToken(monkey.tokenMint)
        return { ...monkey, ...details }
    })
    return await Promise.all(monkeys)
}

const getMonkeysForSale = () => {
    return new Promise((resolve, reject) => {
        resolve([{ ...listings[0], ...data }])
    })
}

export { getMonkeysForSale }
