import fetch from 'node-fetch'

//  Generic methods for querying Magic Eden
const apiv2BaseUrl = 'https://api-mainnet.magiceden.dev/v2'
const apiv1BaseUrl = 'https://api-mainnet.magiceden.io'

// https://api-mainnet.magiceden.io/rpc/getListedNFTsByQuery?q={"$match":{"collectionSymbol":"monkeyball"},"$sort":{"createdAt":-1},"$skip":0,"$limit":20,"status":["all"]}


/*
 * Retrieve the list of NFTs for sale for the specified Collection
 */
const getAuctionList = async (symbol, offset = 0) => {
    const url = `${apiv2BaseUrl}/collections/${symbol}/listings?offset=${offset}`
    const response = await fetch(url)

    if (response.status === 200) {
        const json = await response.json()
        return json
    }
}


/*
 * Retrieve the details for a specific NFT
 */
const getToken = async (id) => {
    const url = `${apiv2BaseUrl}/tokens/${id}`
    const response = await fetch(url)

    if (response.status === 200) {
        const json = await response.json()
        return json
    }
}


/*
 * Retrieve the details for a page of NFTs for the specified collection
 */
const getPageOfNfts = async (symbol, offset = 0) => {
    const take = 20
    const url = `${apiv1BaseUrl}/rpc/getListedNFTsByQuery?q={"$match":{"collectionSymbol":"${symbol}"},"$sort":{"createdAt":-1},"$skip":${offset},"$limit":${take},"status":["all"]}`
    const response = await fetch(url)

    console.log(`Call to ${url} returned ${response.status} status`)

    if (response.status === 200) {
        const json = await response.json()
        return json
    } else if (response.status === 403) {
        console.log(`You do not have access to this API`)
        throw 'Failed'
    }
}


export { getAuctionList, getPageOfNfts, getToken }
