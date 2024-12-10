import React from 'react';
import { Line } from 'react-chartjs-2';
import Pagination from '@mui/material/Pagination';

const LineChart = (props) => {
    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <Line
                data={props.data}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Pickup Date',
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Trip Distance (miles)',
                            },
                        },
                    },
                }}
            />
            <div className='paginations' style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                <Pagination
                    count={props.count} // Adjust total pages based on your dataset
                    page={props.page}
                    onChange={props.onChange} // Handle page change
                />
            </div>
        </div>
    )
}

export default LineChart