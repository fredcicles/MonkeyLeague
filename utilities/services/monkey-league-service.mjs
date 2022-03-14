//  Monkey League specific queries
import { getPageOfNfts } from './magic-eden-service.mjs'

const maxRecordsPerPage = 500
const monkeyLeagueSymbol = 'monkeyball'
const DELAY = 700

const delay = (time) => {
    console.log(`Waiting for ${time} milliseconds`)
    return new Promise(resolve => setTimeout(resolve, time))
}

/*
 * Retrieve all the for sale listings of Monkey League NFTs from Magic Eden
 */
const getAllMonkeys = async () => {
    let allListings = []
    let offset = 0
    let lastPage = false

    while (!lastPage) {
        const pageOfListings = await getPageOfNfts(monkeyLeagueSymbol, offset)
        allListings = allListings.concat(pageOfListings)

        console.log(`Retrieved Monkeys ${offset + 1} - ${offset + 1 + pageOfListings.length} from Magic Eden`)

        offset += maxRecordsPerPage
        lastPage = pageOfListings.length === 0

        // ONLY LOAD 1 PAGE FOR TESTING
        //lastPage = true
    }

    return allListings
}

export { getAllMonkeys }
