import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'

const RangeSelector = ({ className, onChange, title, values }) => {
    const handleChange = event => {
        const minValue = event.target.name === 'minValue' ? event.target.value : values[0]
        const maxValue = event.target.name === 'maxValue' ? event.target.value : values[1]
        const newValues = [minValue, maxValue]
        onChange(newValues)
    }

    return (
        <div className={`range-selector ${className}`}>
            <div className='label'>
                {title}
            </div>
            <div className='controls'>
                <TextField
                    name='minValue'
                    className='min-value'
                    label='Min'
                    variant='standard'
                    value={values[0]}
                    type='number'
                    onChange={handleChange}
                />
                <TextField
                    name='maxValue'
                    className='max-value'
                    label='Max'
                    variant='standard'
                    value={values[1]}
                    type='number'
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

RangeSelector.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    values: PropTypes.array,
}

RangeSelector.defaultProps = {
    className: '',
    onChange: () => { },
    values: ['', ''],
}

export default RangeSelector
