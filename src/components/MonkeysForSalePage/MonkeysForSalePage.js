import React, { useEffect, useState } from 'react'
import { getAllForSaleMonkeyListings, getMonkeyDetails } from '../../services/monkey-league-service'
import { transformRawMonkeyData } from '../../helpers/monkey.helper'
import MonkeyTable from '../MonkeyTable'
import './styles.css'

const DELAY = 575 // # of seconds between each read

const MonkeysForSalePage = () => {
    const [listings, setListings] = useState([])
    const [monkeys, setMonkeys] = useState([])
    const [areListingsLoaded, setListingsLoaded] = useState(false)


    // Load the listings of Monkeys from Magic Eden
    useEffect(() => {
        // Retrieve all of the listings (without details)
        getAllForSaleMonkeyListings()
            .then(_listings => {
                setListings(_listings)
                setListingsLoaded(true)
            })
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
            details = { ...listingToLookup, ...details }

            // Transform the details in to a useful form to display
            const formattedMonkey = transformRawMonkeyData(details)

            // Add the new monkey to the list of monkeys
            const newListOfMonkeys = [...monkeys, formattedMonkey]
            
            setMonkeys(newListOfMonkeys)
            setListings(newListings)
        }

        scheduleLoadOfNextPage()
    }, [listings])


    return <div className='monkeys-for-sale-page'>
        {!areListingsLoaded && 'Looking up listings...'}
        {areListingsLoaded && listings.length > 0 && 'Looking up monkey details'}
        {areListingsLoaded && <MonkeyTable monkeys={monkeys} />}
    </div>
}


export default MonkeysForSalePage
