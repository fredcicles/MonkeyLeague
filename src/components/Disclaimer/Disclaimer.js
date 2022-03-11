import './Disclaimer.css'

const Disclaimer = ({ className }) => {
    return (
        <div className={`disclaimer ${className}`}>
            <div>
                <div className='official'>
                    This is not an official Monkey League site.
                </div>
                <div className='calculated-columns'>
                    * The <div className='column-name'>Score</div> and <div className='column-name'>Good At</div> columns are currently
                    a best guess of how well the NFT could perform at each position and do not reflect the <div className='max-potential'>Max Potential</div> as shown on
                    the official Monkey League site.
                </div>
            </div>
        </div>
    )
}

export default Disclaimer
