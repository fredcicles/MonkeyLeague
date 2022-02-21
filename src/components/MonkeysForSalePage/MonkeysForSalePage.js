import React, { useEffect, useState } from 'react'
import { getMonkeysForSale } from '../../services/monkey-league-service'
import { formatRawMonkeyData } from '../../helpers/monkey.helper'
import './styles.css'

const MonkeysForSalePage = () => {
    const [monkeys, setMonkeys] = useState([]);

    // Load the list of Monkeys
    useEffect(() => {
        getMonkeysForSale()
            .then(monkeysForSale => {
                const monkeysTransformed = formatRawMonkeyData(monkeysForSale)
                setMonkeys(monkeysTransformed)
            })
    }, [])


    return <div className='monkeys-for-sale-page'>
        <table>
            <thead>
                <tr>
                    <th rowspan="2">
                        ID
                    </th>
                    <th rowspan="2">
                        Name
                    </th>
                    <th rowspan="2">
                        Alpha<br />Score
                    </th>
                    <th colspan="4">
                        Skill Max Potential
                    </th>
                    <th colspan="2">
                        Striker
                    </th>
                    <th colspan="2">
                        Midfielder
                    </th>
                    <th colspan="2">
                        Defender
                    </th>
                    <th colspan="2">
                        Goalkeeper
                    </th>
                    <th rowspan="2">
                        Total Potential<br />300 - 400
                    </th>
                </tr>
                <tr>
                    <th>
                        Accuracy
                    </th>
                    <th>
                        Passing
                    </th>
                    <th>
                        Defense
                    </th>
                    <th>
                        Control
                    </th>
                    <th>
                        Score
                    </th>
                    <th>
                        Perks
                    </th>
                    <th>
                        Score
                    </th>
                    <th>
                        Perks
                    </th>
                    <th>
                        Score
                    </th>
                    <th>
                        Perks
                    </th>
                    <th>
                        Score
                    </th>
                    <th>
                        Perks
                    </th>
                </tr>
            </thead>
            <tbody>
                {monkeys.map(monkey => (
                    <tr key={monkey.id}>
                        <td>
                            {monkey.id}
                        </td>
                        <td>
                            {monkey.name}
                        </td>
                        <td>
                            {monkey.alphaScore}
                        </td>
                        <td>
                            {monkey.maxAccuracy}
                        </td>
                        <td>
                            {monkey.maxPassing}
                        </td>
                        <td>
                            {monkey.maxDefense}
                        </td>
                        <td>
                            {monkey.maxControl}
                        </td>
                        <td>
                            {monkey.strikerMaxPotential}
                        </td>
                        <td>
                            {monkey.strikerPerks.toFixed(2)}
                            <br />
                            {monkey.strikerPerksScore.toFixed(2) * 100}%
                        </td>
                        <td>
                            {monkey.midfielderMaxPotential}
                        </td>
                        <td>
                            {monkey.midfielderPerks.toFixed(2)}
                            <br />
                            {monkey.midfielderPerksScore.toFixed(2) * 100}%
                        </td>
                        <td>
                            {monkey.defenderMaxPotential}
                        </td>
                        <td>
                            {monkey.defenderPerks.toFixed(2)}
                            <br />
                            {monkey.defenderPerksScore.toFixed(2) * 100}%
                        </td>
                        <td>
                            {monkey.goalkeeperMaxPotential}
                        </td>
                        <td>
                            {monkey.goalkeeperPerks.toFixed(2)}
                            <br />
                            {monkey.goalkeeperPerksScore.toFixed(2) * 100}%
                        </td>
                        <td>
                            {monkey.totalMaxPotential}
                            <br />
                            {monkey.totalMaxPotentialPercentage.toFixed(2) * 100}%
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default MonkeysForSalePage
