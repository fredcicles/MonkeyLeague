import React, { useEffect, useState } from 'react'
import { getMonkeysForSale } from '../../services/monkey-league-service'
import { formatRawMonkeyData } from '../../helpers/monkey.helper'
import MonkeyTable from '../MonkeyTable'
import './styles.css'

const MonkeysForSalePage = () => {
    const [monkeys, setMonkeys] = useState([]);
    const [sortField] = useState('alphaScore')

    // Load the list of Monkeys
    useEffect(() => {
        getMonkeysForSale()
            .then(monkeysForSale => {
                const monkeysTransformed = formatRawMonkeyData(monkeysForSale)
                setMonkeys(monkeysTransformed)
            })
    }, [])

    const list = monkeys.sort((a,b) => {
        if (a[sortField] < b[sortField]) return -1
        if (a[sortField] > b[sortField]) return 1
        return 0
    })

    return <div className='monkeys-for-sale-page'>
        <MonkeyTable monkeys={list} />
    </div>
}

export default MonkeysForSalePage
