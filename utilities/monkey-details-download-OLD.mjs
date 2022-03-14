// Download the Listings from Magic Eden
// Download the details for each NFT in the listings
// Save the output
import fs from 'fs'
import { getAllForSaleMonkeyListings, getMonkeyDetails } from './services/monkey-league-service.mjs'

const DELAY = 700

const delay = (time) => {
    console.log(`Waiting for ${time} milliseconds`)
    return new Promise(resolve => setTimeout(resolve, time))
}


// Load the details for all listings
const retrieveMonkeyDetails = async (ids) => {
    // Make sure that there are no null records
    const monkeys = loadDataFromFile().filter(monkey => monkey)
    const total = ids.length


    for (let i = 0; i < ids.length; i++) {
        const id = ids[i]

        // Do the details already exist
        const alreadyExists = monkeys.find(monkey => monkey.mintAddress === id)
        if (alreadyExists) continue;

        // Otherwise, look it up
        let details = await getMonkeyDetails(id)

        if (details) {
            monkeys.push(details)
            console.log(`Monkey ${i + 1}/${total} loaded.`)
        } else {
            console.log(`Monkey ${i + 1}/${total} ${id} not found.`)
        }

        delay(DELAY)
    }

    return monkeys
}

const loadDataFromFile = () => {
    //const data = fs.readFileSync('../src/data/monkeys.json')
    const data = fs.readFileSync('./data/monkeys.json')
    return JSON.parse(data)
}

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
    console.log("Downloading the current Monkey League listings from Magic Eden")
    const listings = await getAllForSaleMonkeyListings()
    console.log(`${listings.length} Monkey League listings downloaded from Magic Eden`)

    const monkeys = await retrieveMonkeyDetails(listings.map(listing => listing.tokenMint))

    await saveDataToFile('./data/listings.json', listings)
    await saveDataToFile('./data/monkeys.json', monkeys)

    console.log("Bye!")
}


app()
