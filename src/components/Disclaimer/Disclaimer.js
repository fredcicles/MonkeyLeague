import './Disclaimer.css'

const Disclaimer = ({ className }) => {
    return (
        <div className={`disclaimer ${className}`}>
            <p className='official'>
                This is not an official Monkey League site.
            </p>
            <p className='calculated-columns'>
                * The <i>Score</i> and <i>Good At</i> columns are currently a best guess of how well the NFT could perform
                at each position and do not reflect the 'Max Potential' as shown on the official Monkey League site.
            </p>
        </div>
    )
}

export default Disclaimer
