//  Monkey League specific queries
import { getAuctionList, getToken } from './magic-eden-service'

const monkeyLeagueSymbol = 'monkeyball'

/*
 * Retrieve 20 for sale Monkey League NFTs from Magic Eden
 */
const getMonkeysForSale = async (offset = 0) => {
    let monkeys = await getAuctionList(monkeyLeagueSymbol)
    monkeys = monkeys.map(async (monkey) => {

        const details = await getToken(monkey.tokenMint)
        return { ...monkey, ...details }
    })
    return await Promise.all(monkeys)
}

export { getMonkeysForSale }
