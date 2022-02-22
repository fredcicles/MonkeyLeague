import React from 'react';
import EnhancedTable from '../EnhancedTable'

const formatPercent = (value) => {
    return `${(value * 100).toFixed(0)}%`
}

const columns = [
    {
        label: 'ID',
        id: 'id',
    },
    {
        label: 'Name',
        id: 'name',
    },
    {
        label: <>Alpha<br />Score</>,
        id: 'alphaScore',
    },
    {
        group: true,
        label: 'Skill Max Potential',
        id: 'maxPotential',
        columns: [
            {
                label: 'Accuracy',
                id: 'maxAccuracy',
            },
            {
                label: 'Passing',
                id: 'maxPassing',
            },
            {
                label: 'Defense',
                id: 'maxDefense',
            },
            {
                label: 'Control',
                id: 'maxControl',
            }
        ]
    },
    {
        id: 'striker',
        group: true,
        label: 'Striker',
        columns: [
            {
                label: 'Score',
                id: 'strikerMaxPotential',
            },
            {
                label: 'Perks',
                id: 'strikerPerks',
                renderData: (monkey) => `${monkey.strikerPerks.toFixed(2)} (${formatPercent(monkey.strikerPerksScore)})`
            }
        ]
    },
    {
        id: 'midfielder',
        group: true,
        label: 'Midfielder',
        columns: [
            {
                label: 'Score',
                id: 'midfielderMaxPotential'
            },
            {
                label: 'Perks',
                id: 'midfielderPerks',
                renderData: (monkey) => `${monkey.midfielderPerks.toFixed(2)} (${formatPercent(monkey.midfielderPerksScore)})`
            }
        ]
    },
    {
        id: 'defender',
        group: true,
        label: 'Defender',
        columns: [
            {
                label: 'Score',
                id: 'defenderMaxPotential'
            },
            {
                label: 'Perks',
                id: 'defenderPerks',
                renderData: (monkey) => `${monkey.defenderPerks.toFixed(2)} (${formatPercent(monkey.defenderPerksScore)})`
            }
        ]
    },
    {
        id: 'goalkeeper',
        group: true,
        label: 'Goalkeeper',
        columns: [
            {
                label: 'Score',
                id: 'goalkeeperMaxPotential'
            },
            {
                label: 'Perks',
                id: 'goalkeeperPerks',
                renderData: (monkey) => `${monkey.goalkeeperPerks.toFixed(2)} (${formatPercent(monkey.goalkeeperPerksScore)})`
            }
        ]
    },
    {
        label: <>Total Potential<br />300 - 400</>,
        id: 'totalMaxPotential',
        renderData: (monkey) => `${monkey.totalMaxPotential} (${formatPercent(monkey.totalMaxPotentialPercentage)})`
    }
]

const MonkeyTable = ({ monkeys }) => {
    return (<EnhancedTable columns={columns} rows={monkeys} title="Monkeys" />)
}

export default MonkeyTable
