import React from 'react'
import { getMonkeysForSale } from '../../services/monkey-league-service'

const MonkeysForSalePage = () => {
    const [monkeys, setMonkeys] = useState([]);

    // Load the list of Monkeys
    useEffect(() => {
        const _monkeys = getMonkeysForSale()

        // Perform any data transformation here

        setMonkeys(_monkeys)
    }, [])


    return <div className='monkeys-for-sale-page'>
        <table>
            <tr>
                <th>
                    Name
                </th>
                <th>
                    ID
                </th>
                <th>
                    Alpha Score
                </th>
                <th>
                    Max Accuracy
                </th>
                <th>
                    Max Passing
                </th>
                <th>
                    Max Defense
                </th>
                <th>
                    Max Control
                </th>
                <th>
                    Striker<br/>A+C
                </th>
                <th>
                    Midfielder<br/>x+x
                </th>
                <th>
                    Defender<br/>x+x
                </th>
                <th>
                    Goalkeeper<br/>x+x
                </th>
                <th>
                    Midfielder<br/>x+x
                </th>
                <th>
                    Total Potential<br/>out of 400
                </th>
                <th>
                    Total Potential<br/>%
                </th>
            </tr>
        </table>
    </div>
}

export default MonkeysForSalePage
