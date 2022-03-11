import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MenuItem from '@mui/material/MenuItem'
import RangeSelector from './RangeSelector'
import TextField from '@mui/material/TextField'
import './Filter.css'

const ALPHA_SCORE_RANGE_DEFAULT = [180, 800]
const MAX_POTENTIAL_DEFAULT = 'All'
const PERKS_RANGE_DEFAULT = [0, 100]
const PRICE_RANGE_DEFAULT = [0, '']
const SKILL_RANGE_DEFAULT = [75, 100]
const SKILLS_SUM_RANGE_DEFAULT = [300, 400]

const POSITIONS = [
    'All',
    'Striker',
    'Midfielder',
    'Defender',
    'Goalkeeper',
]

const Filter = ({ filters, onChange }) => {
    const [idName, setIdName] = useState('')
    const [alphaScoreRange, setAlphaScoreRange] = useState(ALPHA_SCORE_RANGE_DEFAULT)
    const [maxPotential, setMaxPotential] = useState(MAX_POTENTIAL_DEFAULT)
    const [priceRange, setPriceRange] = useState(PRICE_RANGE_DEFAULT)

    const [accuracyRange, setAccuracyRange] = useState(SKILL_RANGE_DEFAULT)
    const [passingRange, setPassingRange] = useState(SKILL_RANGE_DEFAULT)
    const [defenseRange, setDefenseRange] = useState(SKILL_RANGE_DEFAULT)
    const [controlRange, setControlRange] = useState(SKILL_RANGE_DEFAULT)
    const [skillsSumRange, setSkillsSumRange] = useState(SKILLS_SUM_RANGE_DEFAULT)

    const [strikerPerksRange, setStrikerPerksRange] = useState(PERKS_RANGE_DEFAULT)
    const [midfielderPerksRange, setMidfielderPerksRange] = useState(PERKS_RANGE_DEFAULT)
    const [defenderPerksRange, setDefenderPerksRange] = useState(PERKS_RANGE_DEFAULT)
    const [goalkeeperPerksRange, setGoalkeeperPerksRange] = useState(PERKS_RANGE_DEFAULT)

    const handleIdNameChange = event => {
        const value = event.target.value
        setIdName(value)
        onChange({ accuracyRange, alphaScoreRange, controlRange, defenderPerksRange, defenseRange, goalkeeperPerksRange, idName: value, passingRange, maxPotential, midfielderPerksRange, priceRange, skillsSumRange, strikerPerksRange })
    }

    const handleAccuracyChange = range => {
        setAccuracyRange(range)
        onChange({ accuracyRange: range, alphaScoreRange, controlRange, defenderPerksRange, defenseRange, goalkeeperPerksRange, idName, passingRange, maxPotential, midfielderPerksRange, priceRange, skillsSumRange, strikerPerksRange })
    }

    const handleAlphaScoreChange = range => {
        setAlphaScoreRange(range)
        onChange({ accuracyRange, alphaScoreRange: range, controlRange, defenderPerksRange, defenseRange, goalkeeperPerksRange, idName, passingRange, maxPotential, midfielderPerksRange, priceRange, skillsSumRange, strikerPerksRange })
    }

    const handleControlChange = range => {
        setControlRange(range)
        onChange({ accuracyRange, alphaScoreRange, controlRange: range, defenderPerksRange, defenseRange, goalkeeperPerksRange, idName, passingRange, maxPotential, midfielderPerksRange, priceRange, skillsSumRange, strikerPerksRange })
    }

    const handleDefenseChange = range => {
        setDefenseRange(range)
        onChange({ accuracyRange, alphaScoreRange, controlRange, defenderPerksRange, defenseRange: range, goalkeeperPerksRange, idName, passingRange, maxPotential, midfielderPerksRange, priceRange, skillsSumRange, strikerPerksRange })
    }

    const handlePassingChange = range => {
        setPassingRange(range)
        onChange({ accuracyRange, alphaScoreRange, controlRange, defenderPerksRange, defenseRange, goalkeeperPerksRange, idName, passingRange: range, maxPotential, midfielderPerksRange, priceRange, skillsSumRange, strikerPerksRange })
    }

    const handleMaxPotentialChange = event => {
        const value = event.target.value
        setMaxPotential(value)
        onChange({ accuracyRange, alphaScoreRange, controlRange, defenderPerksRange, defenseRange, goalkeeperPerksRange, idName, passingRange, maxPotential: value, midfielderPerksRange, priceRange, skillsSumRange, strikerPerksRange })
    }

    const handlePriceChange = range => {
        setPriceRange(range)
        onChange({ accuracyRange, alphaScoreRange, controlRange, defenderPerksRange, defenseRange, goalkeeperPerksRange, idName, passingRange, maxPotential, midfielderPerksRange, priceRange: range, skillsSumRange, strikerPerksRange })
    }

    const handleSkillsSumChange = range => {
        setSkillsSumRange(range)
        onChange({ accuracyRange, alphaScoreRange, controlRange, defenderPerksRange, defenseRange, goalkeeperPerksRange, idName, passingRange, maxPotential, midfielderPerksRange, priceRange, skillsSumRange: range, strikerPerksRange })
    }

    const handleStrikerPerksChange = range => {
        setStrikerPerksRange(range)
        onChange({ accuracyRange, alphaScoreRange, controlRange, defenderPerksRange, defenseRange, goalkeeperPerksRange, idName, passingRange, maxPotential, midfielderPerksRange, priceRange, skillsSumRange, strikerPerksRange: range })
    }

    const handleMidfielderPerksChange = range => {
        setMidfielderPerksRange(range)
        onChange({ accuracyRange, alphaScoreRange, controlRange, defenderPerksRange, defenseRange, goalkeeperPerksRange, idName, passingRange, maxPotential, midfielderPerksRange: range, priceRange, skillsSumRange, strikerPerksRange })
    }

    const handleDefenderPerksChange = range => {
        setDefenderPerksRange(range)
        onChange({ accuracyRange, alphaScoreRange, controlRange, defenderPerksRange: range, defenseRange, goalkeeperPerksRange, idName, passingRange, maxPotential, midfielderPerksRange, priceRange, skillsSumRange, strikerPerksRange })
    }

    const handleGoalkeeperPerksChange = range => {
        setGoalkeeperPerksRange(range)
        onChange({ accuracyRange, alphaScoreRange, controlRange, defenderPerksRange, defenseRange, goalkeeperPerksRange: range, idName, passingRange, maxPotential, midfielderPerksRange, priceRange, skillsSumRange, strikerPerksRange })
    }


    return (
        <div className='filter'>

            <div className='text-selector'>
                <div className='label'>
                    ID/Name
                </div>
                <div className='controls'>
                    <TextField
                        name='idName'
                        className='idName'
                        variant='standard'
                        value={idName}
                        onChange={handleIdNameChange}
                    />
                </div>
            </div>

            <RangeSelector
                onChange={handlePriceChange}
                title='Price'
                values={filters.priceRange}
                range={[0, -1]}
            />
            <RangeSelector
                onChange={handleAlphaScoreChange}
                title='Alpha Score'
                values={filters.alphaScoreRange}
                range={ALPHA_SCORE_RANGE_DEFAULT}
            />

            <RangeSelector
                onChange={handleAccuracyChange}
                title='Accuracy'
                values={filters.accuracyRange}
                range={SKILL_RANGE_DEFAULT}
            />
            <RangeSelector
                onChange={handlePassingChange}
                title='Passing'
                values={filters.passingRange}
                range={SKILL_RANGE_DEFAULT}
            />
            <RangeSelector
                onChange={handleDefenseChange}
                title='Defense'
                values={filters.defenseRange}
                range={SKILL_RANGE_DEFAULT}
            />
            <RangeSelector
                onChange={handleControlChange}
                title='Control'
                values={filters.controlRange}
                range={SKILL_RANGE_DEFAULT}
            />
            <RangeSelector
                onChange={handleSkillsSumChange}
                title='Skills Sum'
                values={filters.skillsSumRange}
                range={SKILLS_SUM_RANGE_DEFAULT}
            />

            <RangeSelector
                onChange={handleStrikerPerksChange}
                title='Striker Perks'
                values={filters.strikerPerksRange}
                range={PERKS_RANGE_DEFAULT}
            />
            <RangeSelector
                onChange={handleMidfielderPerksChange}
                title='Midfielder Perks'
                values={filters.midfielderPerksRange}
                range={PERKS_RANGE_DEFAULT}
            />
            <RangeSelector
                onChange={handleDefenderPerksChange}
                title='Defender Perks'
                values={filters.defenderPerksRange}
                range={PERKS_RANGE_DEFAULT}
            />
            <RangeSelector
                onChange={handleGoalkeeperPerksChange}
                title='Goalkeeper Perks'
                values={filters.goalkeeperPerksRange}
                range={PERKS_RANGE_DEFAULT}
            />

            <TextField
                select
                label='Max Potential'
                className='max-potential-filter'
                onChange={handleMaxPotentialChange}
                value={maxPotential}
            >
                {POSITIONS.map(option => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    )
}

Filter.propTypes = {
    onChange: PropTypes.func,
}

Filter.defaultProps = {
    onChange: () => { },
}

export default Filter
