import React, { useEffect, useState } from 'react'
import SavedMonkeys from '../../data/monkeys.json'
import { getAllForSaleMonkeyListings, getMonkeyDetails } from '../../services/monkey-league-service.js'
import { transformRawMonkeyData } from '../../helpers/monkey.helper'
import Filter from '../Filter'
import ListingsLoadingMessage from './ListingsLoadingMessage'
import MonkeyTable from '../MonkeyTable'
import TipJar from '../TipJar'
import './MonkeysForSalePage.css'

const DELAY = 575 // # of seconds between each read
const FILTERS_DEFAULT = {
    accuracyRange: [75, 100],
    alphaScoreRange: [180, 800],
    controlRange: [75, 100],
    defenderPerksRange: [0, 100],
    defenseRange: [75, 100],
    goalkeeperPerksRange: [0, 100],
    idName: '',
    maxPotential: 'All',
    midfielderPerksRange: [0, 100],
    passingRange: [75, 100],
    priceRange: [0, ''],
    skillsSumRange: [300, 400],
    strikerPerksRange: [0, 100]
}

const MonkeysForSalePage = () => {
    const [listings, setListings] = useState([])
    const [monkeys, setMonkeys] = useState([])
    const [areListingsLoaded, setListingsLoaded] = useState(false)
    const [filters, setFilters] = useState(FILTERS_DEFAULT)


    // Load the listings of Monkeys from Magic Eden
    useEffect(() => {
        const retrieveListings = async () => {
            // Retrieve all of the listings (without details)
            const currentListings = await getAllForSaleMonkeyListings()

            // Merge the previously retrieved monkeys with the listings
            const savedIds = SavedMonkeys
                .filter(monkey => monkey !== null)
                .map(monkey => monkey.mintAddress)
            const newListings = currentListings.filter(listing => !savedIds.includes(listing.tokenMint))

            // This could be done in a reduce as well
            const matchingListings = currentListings.filter(listing => savedIds.includes(listing.tokenMint))
            const _monkeys = matchingListings.map(listing => {
                const match = SavedMonkeys.find(monkey => monkey && monkey.mintAddress === listing.tokenMint)
                return transformRawMonkeyData({ ...listing, ...match })
            })

            setMonkeys(_monkeys)
            setListings(newListings)
            setListingsLoaded(true)
        }

        retrieveListings()
    }, [])


    // Load the details for the monkeys
    useEffect(() => {
        const scheduleLoadOfNextPage = () => {
            setTimeout(() => {
                loadMonkeyDetails()
            }, DELAY)
        }

        // Load the details for 1 monkey at a time
        const loadMonkeyDetails = async () => {
            // Only run this if there are actually listings
            if (listings.length === 0) return

            // List of 20 monkeys to look up details for
            const listingToLookup = listings[0]

            // Remove the 20 from the listings
            const newListings = listings.slice(1)

            // Retrieve details for the next monkey
            let details = await getMonkeyDetails(listingToLookup.tokenMint)

            // Combine the listing and the details
            // Transform the details in to a useful form to display
            const formattedMonkey = transformRawMonkeyData({ ...listingToLookup, ...details })

            // Add the new monkey to the list of monkeys
            const newListOfMonkeys = [...monkeys, formattedMonkey]

            setMonkeys(newListOfMonkeys)
            setListings(newListings)
        }

        scheduleLoadOfNextPage()
        // eslint-disable-line react-hooks/exhaustive-deps
        // eslint-disable-next-line
    }, [listings])


    const handleFilterChange = (newFilters) => {
        setFilters(newFilters)
    }


    const filteredMonkeys = monkeys.filter(monkey => {
        if (!filters) return true

        let idNameMatch = true
        if (filters.idName !== '') {
            // Name is string; ID is number
            if (isNaN(filters.idName)) {
                idNameMatch = monkey.name.toLowerCase().includes(filters.idName.toLowerCase())
            } else {
                idNameMatch = monkey.id.includes(filters.idName)
            }
        }

        const priceLowMatch = monkey.price >= Number(filters.priceRange[0])
        const priceHighMatch = !filters.priceRange[1] || monkey.price <= Number(filters.priceRange[1])
        const alphaScoreLowMatch = monkey.alphaScore >= Number(filters.alphaScoreRange[0])
        const alphaScoreHighMatch = !filters.alphaScoreRange[1] || monkey.alphaScore <= Number(filters.alphaScoreRange[1])

        // Skills
        const accuracyLowMatch = monkey.maxAccuracy >= Number(filters.accuracyRange[0])
        const accuracyHighMatch = !filters.accuracyRange[1] || monkey.maxAccuracy <= Number(filters.accuracyRange[1])
        const passingLowMatch = monkey.maxPassing >= Number(filters.passingRange[0])
        const passingHighMatch = !filters.passingRange[1] || monkey.maxPassing <= Number(filters.passingRange[1])
        const defenseLowMatch = monkey.maxDefense >= Number(filters.defenseRange[0])
        const defenseHighMatch = !filters.defenseRange[1] || monkey.maxDefense <= Number(filters.defenseRange[1])
        const controlLowMatch = monkey.maxControl >= Number(filters.controlRange[0])
        const controlHighMatch = !filters.controlRange[1] || monkey.maxControl <= Number(filters.controlRange[1])

        const skillsSumLowMatch = monkey.maxTotalSkills >= Number(filters.skillsSumRange[0])
        const skillsSumHighMatch = !filters.skillsSumRange[1] || monkey.maxTotalSkills <= Number(filters.skillsSumRange[1])

        // Perks
        const strikerPerksLowMatch = monkey.strikerPerksScore * 100 >= Number(filters.strikerPerksRange[0])
        const strikerPerksHighMatch = !filters.strikerPerksRange[1] || monkey.strikerPerksScore * 100 <= Number(filters.strikerPerksRange[1])
        const midfielderPerksLowMatch = monkey.midfielderPerksScore * 100 >= Number(filters.midfielderPerksRange[0])
        const midfielderPerksHighMatch = !filters.midfielderPerksRange[1] || monkey.midfielderPerksScore * 100 <= Number(filters.midfielderPerksRange[1])
        const defenderPerksLowMatch = monkey.defenderPerksScore * 100 >= Number(filters.defenderPerksRange[0])
        const defenderPerksHighMatch = !filters.defenderPerksRange[1] || monkey.defenderPerksScore * 100 <= Number(filters.defenderPerksRange[1])
        const goalkeeperPerksLowMatch = monkey.goalkeeperPerksScore * 100 >= Number(filters.goalkeeperPerksRange[0])
        const goalkeeperPerksHighMatch = !filters.goalkeeperPerksRange[1] || monkey.goalkeeperPerksScore * 100 <= Number(filters.goalkeeperPerksRange[1])

        const maxPotential = filters.maxPotential === 'All' || monkey.maxPotential === filters.maxPotential

        return idNameMatch &&
            priceLowMatch && priceHighMatch &&
            alphaScoreLowMatch && alphaScoreHighMatch &&
            accuracyLowMatch && accuracyHighMatch &&
            passingLowMatch && passingHighMatch &&
            defenseLowMatch && defenseHighMatch &&
            controlLowMatch && controlHighMatch &&
            skillsSumLowMatch && skillsSumHighMatch &&
            strikerPerksLowMatch && strikerPerksHighMatch &&
            midfielderPerksLowMatch && midfielderPerksHighMatch &&
            defenderPerksLowMatch && defenderPerksHighMatch &&
            goalkeeperPerksLowMatch && goalkeeperPerksHighMatch &&
            maxPotential
    })

    return <div className='monkeys-for-sale-page'>
        <ListingsLoadingMessage visible={!areListingsLoaded} />
        {areListingsLoaded && listings.length > 0 && 'Looking up monkey details'}
        {areListingsLoaded &&
            <>
                <Filter filters={filters} onChange={handleFilterChange} />
                <MonkeyTable monkeys={filteredMonkeys} />
                <TipJar />
            </>
        }
    </div>
}


export default MonkeysForSalePage
