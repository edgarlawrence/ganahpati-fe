import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';

const MapTable = ({ data = [], onRowClick, count = 1, page = 1, onPaginationChange }) => {
    return (
        <TableContainer component={Paper} style={{ width: '50%', margin: 'auto', marginTop: '20px' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Vendor ID</TableCell>
                        <TableCell>Pickup Time</TableCell>
                        <TableCell>Dropoff Time</TableCell>
                        <TableCell>Passenger Count</TableCell>
                        <TableCell>Trip Distance</TableCell>
                        <TableCell>Fare Amount</TableCell>
                        <TableCell>Payment Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length > 0 ? (
                        data.map((trip, index) => (
                            <TableRow
                                key={index}
                                hover
                                onClick={() => onRowClick(trip)} // Pass the selected trip
                                style={{ cursor: 'pointer' }}
                            >
                                <TableCell>{trip.vendor_id || 'N/A'}</TableCell>
                                <TableCell>{trip.pickup_datetime || 'N/A'}</TableCell>
                                <TableCell>{trip.dropoff_datetime || 'N/A'}</TableCell>
                                <TableCell>{trip.passenger_count || 'N/A'}</TableCell>
                                <TableCell>{trip.trip_distance || 'N/A'}</TableCell>
                                <TableCell>{trip.fare_amount || 'N/A'}</TableCell>
                                <TableCell>{trip.payment_type || 'N/A'}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={8} style={{ textAlign: 'center' }}>
                                No data available
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Pagination
                    count={count}
                    page={page}
                    onChange={onPaginationChange} // Handle page change
                />
            </div>
        </TableContainer>
    );
};

export default MapTable;