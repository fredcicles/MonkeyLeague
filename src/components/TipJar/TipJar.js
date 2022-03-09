import addresses from '../../data/addresses.json'
import Money from '@mui/icons-material/LocalAtm'
import Disclaimer from '../Disclaimer'
import './TipJar.css'

const TipJar = () => {
    const tooltipText = 'Copy to clipboard'

    const copyToClipboard = wallet => {
        navigator.clipboard.writeText(wallet.address)

        const id = `tooltip-${wallet.name}`
        const tooltip = document.getElementById(id)
        tooltip.innerHTML = `Copied: ${wallet.address}`
    }

    const revertTooltipText = wallet => {
        const id = `tooltip-${wallet.name}`
        const tooltip = document.getElementById(id)
        tooltip.innerHTML = tooltipText
    }

    return (
        <div className='tipjar'>
            <div className='heading'>
                <div>
                    <div className='title'>
                        Tip Jar
                    </div>
                    <Money className='icon' />
                </div>
                <div className='content'>
                    If you find this site useful, show your appreciation by contributing to the development by making a donation to our tip jar.
                </div>
            </div>
            <div className='addresses'>
                {addresses.map(wallet => (
                    <div className='wallet'>
                        <div className='logo'>
                            <img src={`${process.env.PUBLIC_URL}/${wallet.logo}`} alt={`${wallet.name} Logo`} />
                        </div>
                        <div class='tooltip' onClick={() => copyToClipboard(wallet)} onMouseOut={() => revertTooltipText(wallet)}>
                            <div className='address'>
                                {wallet.address}
                            </div>
                            <div className='tooltiptext' id={`tooltip-${wallet.name}`}>{tooltipText}</div>
                        </div>
                    </div>
                ))}
            </div>
            <Disclaimer className='footer' />
        </div>
    )
}

export default TipJar
