//  Monkey League specific queries
import { getAuctionList, getToken } from './magic-eden-service.mjs'

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
    const maxListingsPerPage = 20
    let allListings = []
    let offset = 0
    let lastPage = false

    while (!lastPage) {
        const pageOfListings = await getAuctionList(monkeyLeagueSymbol, offset)
        allListings = allListings.concat(pageOfListings)

        offset += maxListingsPerPage
        lastPage = pageOfListings.length < maxListingsPerPage

        // ONLY LOAD 1 PAGE FOR TESTING
        //lastPage = true
    }

    return allListings
}


/*
 * Retrieve details for a list of Monkey League NFTs from Magic Eden
 */
const getMonkeysDetails = async monkeyIds => {
    const monkeys = monkeyIds.map(async (id) => {
        const details = await getToken(id)
        return details
    })

    return await Promise.all(monkeys)
}



/*
 * Retrieve details for a single Monkey League NFT from Magic Eden
 */
const getMonkeyDetails = async monkeyId => {
    const details = await getToken(monkeyId)
    return details
}


export { getAllForSaleMonkeyListings, getMonkeyDetails, getMonkeysDetails, getMonkeysForSale }
