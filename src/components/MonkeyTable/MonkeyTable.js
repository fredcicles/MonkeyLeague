import React from 'react';
import {
    MAX_PERKS_STRIKER,
    MAX_PERKS_MIDFIELDER,
    MAX_PERKS_DEFENDER,
    MAX_PERKS_GOALKEEPER
} from '../../constants/monkey.constants'
import EnhancedTable from '../EnhancedTable'
import './MonkeyTable.css'

const formatPercent = (value) => {
    return `${(value * 100).toFixed(0)}%`
}

const renderAlphaScore = ({ alphaScore }) => {
    const ratingClass = Number(alphaScore) < 400 ? 'low' :
        Number(alphaScore) >= 600 ? 'high' :
            'medium'
    return <div className={ratingClass}>{alphaScore}</div>
}


const renderMaxPotential = (monkey, position) => {
    const score = monkey[`${position}MaxPotential`]
    return score ? score.toFixed(2) : ''
}

const renderPerks = (monkey, position) => {
    const perk = monkey[`${position}Perks`].toFixed(2)
    const rawScore = monkey[`${position}PerksScore`]
    const score = formatPercent(rawScore)
    const maxPerk = position === 'striker' ? MAX_PERKS_STRIKER :
        position === 'midfielder' ? MAX_PERKS_MIDFIELDER :
            position === 'defender' ? MAX_PERKS_DEFENDER :
                position === 'goalkeeper' ? MAX_PERKS_GOALKEEPER :
                    position === 'total' ? MAX_PERKS_STRIKER + MAX_PERKS_MIDFIELDER + MAX_PERKS_DEFENDER + MAX_PERKS_GOALKEEPER
                        : ''
    const title = `${perk} out of ${maxPerk} possible = ${score}`

    let ratingClass = ''
    if (position === 'total') {
        ratingClass = Number(rawScore) <= 0.39 ? 'low' :
        Number(rawScore) >= 0.46 ? 'high' :
            'medium'
    } else {
        ratingClass = Number(rawScore) <= 0.36 ? 'low' :
        Number(rawScore) >= 0.47 ? 'high' :
            'medium'
    }

    return perk ? <div className={ratingClass} title={title}>{`${perk} (${score})`}</div> : ''
}

const renderSkill = (monkey, skill) => {
    const skillName = `${skill[0].toUpperCase()}${skill.slice(1, skill.length)}`
    const skillValue = monkey[skill]
    const skillMaxValue = monkey[`max${skillName}`]

    let ratingClass = ''
    if (skill === 'totalSkills') {
        ratingClass = skillMaxValue <= 333 ? 'low' :
            skillMaxValue >= 367 ? 'high' :
                'medium'
    } else {
        ratingClass = skillMaxValue <= 83 ? 'low' :
            skillMaxValue >= 92 ? 'high' :
                'medium'
    }

    return <div className={ratingClass} title={`${skillValue} ${skillName} / ${skillMaxValue} Max ${skillName}`}>{`${skillValue} / ${skillMaxValue}`}</div>
}

const createLink = (monkey, linkField, displayField) => {
    return <a title='Link to Magic Eden' href={monkey[linkField]} target='_blank' rel='noreferrer'>{monkey[displayField]}</a>
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
        label: <>Price<br />SOL</>,
        id: 'price',
    },
    {
        label: <div title='Alpha Score: 180  - 800'>Alpha<br />Score</div>,
        id: 'alphaScore',
        renderData: monkey => renderAlphaScore(monkey)
    },
    {
        group: true,
        label: 'Skill Max Potential',
        id: 'skillsMaxPotential',
        columns: [
            {
                label: <div title='Accuracy / Max Accuracy'>Accuracy</div>,
                id: 'maxAccuracy',
                renderData: monkey => renderSkill(monkey, 'accuracy')
            },
            {
                label: <div title='Passing / Max Passing'>Passing</div>,
                id: 'maxPassing',
                renderData: monkey => renderSkill(monkey, 'passing')
            },
            {
                label: <div title='Defense / Max Defense'>Defense</div>,
                id: 'maxDefense',
                renderData: monkey => renderSkill(monkey, 'defense')
            },
            {
                label: <div title='Control / Max Control'>Control</div>,
                id: 'maxControl',
                renderData: monkey => renderSkill(monkey, 'control')
            },
            {
                label: <div title='Sum: 300  - 400'>Sum</div>,
                id: 'maxTotalSkills',
                renderData: monkey => renderSkill(monkey, 'totalSkills')
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
                label: <div title='Precision Shot, Protective Holding, Hard Header'>Perks</div>,
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
                label: <div title='Flank Pass, Extreme Pressing, Pass Interception'>Perks</div>,
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
                label: <div title='Hard Tackle, Defensive Awareness, Last Stand Defense'>Perks</div>,
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
                label: <div title='Golden Gloves, Goalie Resistance, Goalie Long Ball'>Perks</div>,
                id: 'goalkeeperPerks',
                renderData: (monkey) => renderPerks(monkey, 'goalkeeper')
            }
        ]
    },
    {
        id: 'totalPerksScore',
        label: <div title='Sum of all perks'>Total<br />Perks</div>,
        renderData: (monkey) => renderPerks(monkey, 'total')
    },
    {
        id: 'maxPotential',
        label: <div title='Based on highest position score'>Good<br />At*</div>,
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
