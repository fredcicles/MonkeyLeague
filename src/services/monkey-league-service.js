//  Monkey League specific queries
import { getAuctionList, getToken } from './magic-eden-service.js'

const monkeyLeagueSymbol = 'monkeyball'

/*
 * Retrieve 20 for sale Monkey League NFTs from Magic Eden
 */
const getMonkeysForSale = async (offset = 0) => {
    let monkeys = await getAuctionList(monkeyLeagueSymbol, offset)
    monkeys = monkeys.map(async (monkey) => {

        const details = await getToken(monkey.tokenMint)
        return { ...monkey, ...details }
    })
    return await Promise.all(monkeys)
}


/*
 * Retrieve all the for sale listings of Monkey League NFTs from Magic Eden
 */
const getAllForSaleMonkeyListings = async () => {
    const pageSize = 20
    let allListings = []
    let offset = 0
    let isLastPage = false

    while (!isLastPage) {
        const pageOfListings = await getAuctionList(monkeyLeagueSymbol, offset)
        allListings = allListings.concat(pageOfListings)

        console.log(`Loaded listings ${offset + 1} - ${offset + 1 + pageOfListings.length} from Magic Eden`)

        offset += pageSize
        isLastPage = pageOfListings.length === 0

        // ONLY LOAD 1 PAGE FOR TESTING
        //lastPage = true
    }

    return allListings
}


/*
 * Retrieve details for a list of Monkey League NFTs from Magic Eden
 */
const getMonkeysDetails = async (monkeyIds) => {
    const monkeys = monkeyIds.map(async (id) => {
        const details = await getToken(id)
        return details
    })

    return await Promise.all(monkeys)
}



/*
 * Retrieve details for a single Monkey League NFT from Magic Eden
 */
const getMonkeyDetails = async (monkeyId) => {
    const details = await getToken(monkeyId)
    return details
}


export { getAllForSaleMonkeyListings, getMonkeyDetails, getMonkeysDetails, getMonkeysForSale }

