import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MenuItem from '@mui/material/MenuItem'
import RangeSelector from './RangeSelector'
import TextField from '@mui/material/TextField'
import './Filter.css'

const ALPHA_SCORE_RANGE_DEFAULT = [180, 800]
const SKILL_RANGE_DEFAULT = [75, 100]
const PRICE_RANGE_DEFAULT = [0, '']
const MAX_POTENTIAL_DEFAULT = 'All'

const POSITIONS = [
    'All',
    'Striker',
    'Midfielder',
    'Defender',
    'Goalkeeper',
]

const Filter = ({ filters, onChange }) => {
    const [alphaScoreRange, setAlphaScoreRange] = useState(ALPHA_SCORE_RANGE_DEFAULT)
    const [maxPotential, setMaxPotential] = useState(MAX_POTENTIAL_DEFAULT)
    const [priceRange, setPriceRange] = useState(PRICE_RANGE_DEFAULT)

    const [accuracyRange, setAccuracyRange] = useState(SKILL_RANGE_DEFAULT)
    const [passingRange, setPassingRange] = useState(SKILL_RANGE_DEFAULT)
    const [defenseRange, setDefenseRange] = useState(SKILL_RANGE_DEFAULT)
    const [controlRange, setControlRange] = useState(SKILL_RANGE_DEFAULT)


    const handleAccuracyChange = range => {
        setAccuracyRange(range)
        onChange({ accuracyRange: range, alphaScoreRange, controlRange, defenseRange, passingRange, maxPotential, priceRange })
    }

    const handleAlphaScoreChange = range => {
        setAlphaScoreRange(range)
        onChange({ accuracyRange, alphaScoreRange: range, controlRange, defenseRange, passingRange, maxPotential, priceRange })
    }

    const handleControlChange = range => {
        setControlRange(range)
        onChange({ accuracyRange, alphaScoreRange, controlRange: range, defenseRange, passingRange, maxPotential, priceRange })
    }

    const handleDefenseChange = range => {
        setDefenseRange(range)
        onChange({ accuracyRange, alphaScoreRange, controlRange, defenseRange: range, passingRange, maxPotential, priceRange })
    }

    const handlePassingChange = range => {
        setPassingRange(range)
        onChange({ accuracyRange, alphaScoreRange, controlRange, defenseRange, passingRange: range, maxPotential, priceRange })
    }

    const handleMaxPotentialChange = event => {
        const value = event.target.value
        setMaxPotential(value)
        onChange({ accuracyRange, alphaScoreRange, controlRange, defenseRange, passingRange, maxPotential: value, priceRange })
    }

    const handlePriceChange = range => {
        setPriceRange(range)
        onChange({ accuracyRange, alphaScoreRange, controlRange, defenseRange, passingRange, maxPotential, priceRange: range })
    }

    
    return (
        <div className='filter'>
            <RangeSelector
                className='price-filter'
                onChange={handlePriceChange}
                title='Price'
                values={filters.priceRange}
                range={[0, -1]}
            />
            <RangeSelector
                className='alpha-score-filter'
                onChange={handleAlphaScoreChange}
                title='Alpha Score'
                values={filters.alphaScoreRange}
                range={ALPHA_SCORE_RANGE_DEFAULT}
            />

            <RangeSelector
                className='alpha-score-filter'
                onChange={handleAccuracyChange}
                title='Accuracy'
                values={filters.accuracyRange}
                range={SKILL_RANGE_DEFAULT}
            />
            <RangeSelector
                className='alpha-score-filter'
                onChange={handlePassingChange}
                title='Passing'
                values={filters.passingRange}
                range={SKILL_RANGE_DEFAULT}
            />
            <RangeSelector
                className='alpha-score-filter'
                onChange={handleDefenseChange}
                title='Defense'
                values={filters.defenseRange}
                range={SKILL_RANGE_DEFAULT}
            />
            <RangeSelector
                className='alpha-score-filter'
                onChange={handleControlChange}
                title='Control'
                values={filters.controlRange}
                range={SKILL_RANGE_DEFAULT}
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
