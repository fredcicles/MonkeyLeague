import Disclaimer from '../Disclaimer'

const ListingsLoadingMessage = ({ visible }) => {
    if (!visible) return null

    return (
        <>
            <div className='loading-section'>
                <div className='loading-message'>Loading listings from Magic Eden.  The initial load from Magic Eden could take a couple of minutes.</div>
            </div>
            <Disclaimer className='body' />
        </>
    )
}

export default ListingsLoadingMessage
