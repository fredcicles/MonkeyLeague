import React from 'react'
import TableCell from '@mui/material/TableCell'

const EnhancedTableCell = ({ column, row }) => {
    const className = column.className

    const content = column.renderData
        ? column.renderData(row, column.id)
        : row[column.id]

    return <TableCell key={`${column.id}`} className={className} scope='row' padding={column.disablePadding ? 'none' : 'normal'}>{content}</TableCell>
}

export default EnhancedTableCell
