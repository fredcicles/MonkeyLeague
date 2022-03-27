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
            <table className='tipjar-table'>
                <thead>
                    <tr className='heading'>
                        <td>
                            <div className='title'>
                                Tip Jar
                            </div>
                            <Money />
                        </td>
                        <td className='content'>
                            If you find this site useful, show your appreciation by contributing to the development by making a donation to our tip jar.
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {addresses.map(wallet => (
                        <tr key={wallet.name} className='wallet'>
                            <td className='logo'>
                                <img src={`${process.env.PUBLIC_URL}/${wallet.logo}`} alt={`${wallet.name} Logo`} />
                            </td>
                            <td className='tooltip' onClick={() => copyToClipboard(wallet)} onMouseOut={() => revertTooltipText(wallet)}>
                                <div className='address'>
                                    {wallet.address}
                                </div>
                                <div className='tooltiptext' id={`tooltip-${wallet.name}`}>{tooltipText}</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='support'>
                For support or feedback, contact <b>cicles#4351</b> on discord, 
                <b>@cicles</b> on the Monkey League discord server.
            </div>
            <Disclaimer className='footer' />
        </div >
    )
}

export default TipJar
