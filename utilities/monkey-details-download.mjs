// Download the Listings from Magic Eden
// Download the details for each NFT in the listings
// Save the output
import fs from 'fs'
import { getAllMonkeys } from './services/monkey-league-service.mjs'

const saveDataToFile = async (fileName, data) => {
    console.log("Saving data to disk")

    fs.writeFile(fileName, JSON.stringify(data), err => {
        if (err)
            throw err
        console.log('File saved')
    })

    console.log("Data saved to disk")
}

const app = async () => {
    console.log("Downloading the Monkey League NFTs from Magic Eden")
    try {
        const monkeys = await getAllMonkeys()
        console.log(`${listings.length} Monkey League NFTs downloaded from Magic Eden`)
        await saveDataToFile('./data/monkeys.json', monkeys)
    } catch {
    }

    console.log("Bye!")
}

app()
