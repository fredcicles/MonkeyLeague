//  Generic methods for querying Magic Eden
const baseUrl = 'https://api-mainnet.magiceden.dev/v2'


/*
 * Retrieve the list of NFTs for sale for the specified Collection
 */
const getAuctionList = async (symbol, offset = 0) => {
    const url = `${baseUrl}/collections/${symbol}/listings?offset=${offset}`
    const response = await fetch(url)
    return response
}


/*
 * Retrieve the details for a specific NFT
 */
const getToken = async (id) => {
    const url = `${baseUrl}/tokens/${id}`
    const response = await fetch(url)
    return response
}


export { getAuctionList, getToken }
