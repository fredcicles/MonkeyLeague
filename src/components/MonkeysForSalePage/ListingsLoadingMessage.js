import Disclaimer from '../Disclaimer'

const ListingsLoadingMessage = ({ visible }) => {
    if (!visible) return null

    return (
        <>
            <div className='loading-section'>
                <div className='loading-message'>Loading listings from Magic Eden.  This will initially take about a minute.</div>
            </div>
            <Disclaimer className='body' />
        </>
    )
}

export default ListingsLoadingMessage
