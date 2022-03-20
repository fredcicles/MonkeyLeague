import React from 'react';
import EnhancedTable from '../EnhancedTable'
import './MonkeyTable.css'

const formatPercent = (value) => {
    return `${(value * 100).toFixed(0)}%`
}

const renderMaxPotential = (monkey, position) => {
    const score = monkey[`${position}MaxPotential`]
    return score ? score.toFixed(2) : ''
}

const renderPerks = (monkey, position) => {
    const perk = monkey[`${position}Perks`]
    const score = monkey[`${position}PerksScore`]
    return perk ? `${perk.toFixed(2)} (${formatPercent(score)})` : ''
}

/*
const renderTotalMaxPotential = (monkey) => {
    return monkey.totalMaxPotential ? `${monkey.totalMaxPotential} (${formatPercent(monkey.totalMaxPotentialPercentage)})` : ''
}
*/

const createLink = (monkey, linkField, displayField) => {
    return <a href={monkey[linkField]} target='_blank' rel='noreferrer'>{monkey[displayField]}</a>
}


const columns = [
    {
        label: 'ID',
        id: 'id',
        renderData: monkey => createLink(monkey, 'link', 'id'),
    },
    {
        label: 'Name',
        id: 'name',
        renderData: monkey => createLink(monkey, 'link', 'name'),
    },
    {
        label: <>Price<br/>SOL</>,
        id: 'price',
    },
    {
        label: <>Alpha<br />Score</>,
        id: 'alphaScore',
    },
    {
        group: true,
        label: 'Skill Max Potential',
        id: 'skillsMaxPotential',
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
            },
            {
                label: 'Sum',
                id: 'totalMaxPotential'//,
                //renderData: monkey => renderTotalMaxPotential(monkey)
            }
        ]
    },
    {
        id: 'striker',
        group: true,
        label: 'Striker',
        columns: [
            {
                label: <div title='Striker score based on Max Accuracy, Max Control and Striker Perks'>Score*</div>,
                id: 'strikerMaxPotential',
                className: 'experimental',
                renderData: monkey => renderMaxPotential(monkey, 'striker')
            },
            {
                label: 'Perks',
                id: 'strikerPerks',
                renderData: monkey => renderPerks(monkey, 'striker')
            }
        ]
    },
    {
        id: 'midfielder',
        group: true,
        label: 'Midfielder',
        columns: [
            {
                label: <div title='Midfielder score based on Max Passing, Max Control and Midfielder Perks'>Score*</div>,
                id: 'midfielderMaxPotential',
                className: 'experimental',
                renderData: monkey => renderMaxPotential(monkey, 'midfielder')
            },
            {
                label: 'Perks',
                id: 'midfielderPerks',
                renderData: (monkey) => renderPerks(monkey, 'midfielder')
            }
        ]
    },
    {
        id: 'defender',
        group: true,
        label: 'Defender',
        columns: [
            {
                label: <div title='Defender score based on Max Defense, Max Control and Defender Perks'>Score*</div>,
                id: 'defenderMaxPotential',
                className: 'experimental',
                renderData: monkey => renderMaxPotential(monkey, 'defender')
            },
            {
                label: 'Perks',
                id: 'defenderPerks',
                renderData: (monkey) => renderPerks(monkey, 'defender')
            }
        ]
    },
    {
        id: 'goalkeeper',
        group: true,
        label: 'Goalkeeper',
        columns: [
            {
                label: <div title='Goalkeeper score based on Max Defense, Max Control and Goalkeeper Perks'>Score*</div>,
                id: 'goalkeeperMaxPotential',
                className: 'experimental',
                renderData: monkey => renderMaxPotential(monkey, 'goalkeeper')
            },
            {
                label: 'Perks',
                id: 'goalkeeperPerks',
                renderData: (monkey) => renderPerks(monkey, 'goalkeeper')
            }
        ]
    },
    {
        id: 'totalPerksScore',
        label: <>Total<br/>Perks</>,
        renderData: (monkey) => renderPerks(monkey, 'total')
    },
    {
        id: 'maxPotential',
        label: <>Good<br/>At*</>,
        className: 'experimental'
    }
]

const MonkeyTable = ({ monkeys }) => {
    return (
        <div className='monkey-table'>
            <EnhancedTable columns={columns} rows={monkeys} hover={false} />
        </div>
    )
}

export default MonkeyTable
