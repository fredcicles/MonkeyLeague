import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'

const HeaderRowOne = ({ columns, order, orderBy, createSortHandler }) => (
    <TableRow>
        {columns.map((column) => (
            <TableCell
                key={column.id}
                rowSpan={column.group ? '1' : '2'}
                colSpan={column.group ? column.columns.length : '1'}
                align={column.numeric ? 'right' : 'left'}
                padding={column.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === column.id ? order : false}
            >
                {column.group ? column.label : (
                    <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : 'desc'}
                        onClick={createSortHandler(column.id)}
                    >
                        {column.label}
                        {orderBy === column.id ? (
                            <Box component='span' sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                        ) : null}
                    </TableSortLabel>
                )}
            </TableCell>
        ))}
    </TableRow>
)

const HeaderRowTwo = ({ columns, order, orderBy, createSortHandler }) => (
    <TableRow>
        {columns
            .filter(column => column.group)
            .map((parent) => parent.columns.map((column) => (
                <TableCell
                    key={column.id}
                    align={column.numeric ? 'right' : 'left'}
                    padding={column.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === column.id ? order : false}
                >
                    <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : 'desc'}
                        onClick={createSortHandler(column.id)}
                    >
                        {column.label}
                        {orderBy === column.id ? (
                            <Box component='span' sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                        ) : null}
                    </TableSortLabel>
                </TableCell>
            )))}
    </TableRow>
)

const EnhancedTableHead = ({ columns, order, orderBy, onRequestSort }) => {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property)
    }

    const has2ndRow = columns.find(column => column.group)

    return (
        <TableHead>
            <HeaderRowOne columns={columns} order={order} orderBy={orderBy} createSortHandler={createSortHandler} />
            {has2ndRow && <HeaderRowTwo columns={columns} order={order} orderBy={orderBy} createSortHandler={createSortHandler} />}
        </TableHead>
    )
}

EnhancedTableHead.propTypes = {
    columns: PropTypes.array.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired
}

export default EnhancedTableHead
