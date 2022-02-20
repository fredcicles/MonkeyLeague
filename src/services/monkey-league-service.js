//  Monkey League specific queries
import { getAuctionList, getToken } from './magic-eden-service'

const monkeyLeagueSymbol = 'MonkeyBall'

/*
 * Retrieve 20 for sale Monkey League NFTs from Magic Eden
 */
const getMonkeysForSale = (offset = 0) => {
    const monkeys = getAuctionList(monkeyLeagueSymbol)

    const monkeys = monkeys.map(monkey => {
        const details = getToken(monkey.tokenMint)
        return { ...monkey, ...details }
    })
}

export { getMonkeysForSale }
