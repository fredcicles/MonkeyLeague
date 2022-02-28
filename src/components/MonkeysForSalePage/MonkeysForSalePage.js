import React, { useEffect, useState } from 'react'
import { getAllForSaleMonkeyListings, getMonkeyDetails } from '../../services/monkey-league-service.js'
import { transformRawMonkeyData } from '../../helpers/monkey.helper'
import MonkeyTable from '../MonkeyTable'
import Filter from '../Filter'
import SavedMonkeys from '../../data/monkeys.json'
import './MonkeysForSalePage.css'

const DELAY = 575 // # of seconds between each read
const FILTERS_DEFAULT = {
    accuracyRange: [75, 100],
    alphaScoreRange: [180, 800],
    controlRange: [75, 100],
    defenseRange: [75, 100],
    passingRange: [75, 100],
    position: 'All',
    priceRange: [0, '']
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
    }, [listings])


    const handleFilterChange = (newFilters) => {
        setFilters(newFilters)
    }


    const filteredMonkeys = monkeys.filter(monkey => {
        if (!filters) return true

        const priceLowMatch = monkey.price >= filters.priceRange[0]
        const priceHighMatch = !filters.priceRange[1] || monkey.price <= filters.priceRange[1]
        const alphaScoreLowMatch = monkey.alphaScore >= filters.alphaScoreRange[0]
        const alphaScoreHighMatch = monkey.alphaScore <= filters.alphaScoreRange[1]

        // Skills
        const accuracyLowMatch = monkey.maxAccuracy >= filters.accuracyRange[0]
        const accuracyHighMatch = monkey.maxAccuracy <= filters.accuracyRange[1]
        const passingLowMatch = monkey.maxPassing >= filters.passingRange[0]
        const passingHighMatch = monkey.maxPassing <= filters.passingRange[1]
        const defenseLowMatch = monkey.maxDefense >= filters.defenseRange[0]
        const defenseHighMatch = monkey.maxDefense <= filters.defenseRange[1]
        const controlLowMatch = monkey.maxControl >= filters.controlRange[0]
        const controlHighMatch = monkey.maxControl <= filters.controlRange[1]

        const position = filters.position === 'All' || monkey.maxPotential === filters.position

        return priceLowMatch && priceHighMatch &&
            alphaScoreLowMatch && alphaScoreHighMatch &&
            accuracyLowMatch && accuracyHighMatch &&
            passingLowMatch && passingHighMatch &&
            defenseLowMatch && defenseHighMatch &&
            controlLowMatch && controlHighMatch &&
            position
    })

    return <div className='monkeys-for-sale-page'>
        {!areListingsLoaded && 'Looking up listings...'}
        {areListingsLoaded && listings.length > 0 && 'Looking up monkey details'}
        {areListingsLoaded &&
            <>
                <Filter filters={filters} onChange={handleFilterChange} />
                <MonkeyTable monkeys={filteredMonkeys} />
            </>
        }
    </div>
}


export default MonkeysForSalePage
