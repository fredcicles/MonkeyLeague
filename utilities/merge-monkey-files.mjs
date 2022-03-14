// Merge the list of monkeys from multiple files
// Save the output
import fs from 'fs'

const files = [
    '0000-0499',
    '0500-0999',
    '1000-1499',
    '1500-1999',
    '2000-2499',
    '2500-2999',
    '3000-3499',
    '3500-3999',
    '4000-4499',
    '4500-4999',
    '5000-5499',
    '5500-5999',
    '6000-6499',
    '6500-6999',
    '7000-7499',
    '7500-7999',
    '8000-8499',
    '8500-8999',
    '9000-9499',
    '9500-9999',
    '10000-10499',
    '10500-10999',
    '11000-11499',
    '11500-11999',
    '12000-12499',
    '12500-12999',
    '13000-13499',
    '13500-13999',
]

const loadDataFromFile = fileId => {
    const fileName = `./data/Monkeys ${fileId}.json`

    console.log(`Loading file ${fileName} from disk.`)
    const data = fs.readFileSync(fileName)
    console.log(`File ${fileName} loaded from disk.`)

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
    console.log("Downloading the Monkey League NFTs from Magic Eden")

    try {
        // Master list of monkeys
        const unsortedMonkeys = []

        // Load each file and add it to the master list
        for(let i = 0; i < files.length; i++) {
            // Load the monkey file
            const monkeys = loadDataFromFile(files[i]).results

            // Add each monkey from the file to the master list
            for (let j = 0; j < monkeys.length; j++) {
                const currentMonkey = monkeys[j]

                // If monkey is null or already in the master list, then skip it
                if (!currentMonkey || unsortedMonkeys.includes(m => m.mintAddress === currentMonkey.mintAddress)) continue;

                // Add the new monkey to the master list
                unsortedMonkeys.push(currentMonkey)
            }
        }

        console.log(`${unsortedMonkeys.length} Monkey League NFTs loaded from Magic Eden`)

        // Sort the Monkeys by ID
        const sortedMonkeys = unsortedMonkeys.sort((a, b) => {
            const aId = Number(a.attributes.find(attribute => attribute.trait_type === 'Monkey ID').value)
            const bId = Number(b.attributes.find(attribute => attribute.trait_type === 'Monkey ID').value)

            if (aId < bId) return -1
            if (aId > bId) return 1
            return 0
        })

        await saveDataToFile('./data/allMonkeys.json', sortedMonkeys)
    } catch(err) {
        throw err
    }

    console.log("Bye!")
}

app()
