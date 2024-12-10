import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Filter = ({ onApplyFilters, onReset }) => {
    const [filters, setFilters] = useState([
        { type: 'fare', value: '' }, // Default filter
    ]);

    const filterOptions = [
        { label: 'Fare Amount', value: 'fare' },
        { label: 'Trip Distance', value: 'distance' },
        { label: 'Payment Type', value: 'payment' },
        { label: 'Pickup Date', value: 'date' },
    ];

    const handleAddFilter = () => {
        setFilters([...filters, { type: '', value: '' }]);
    };

    const handleDeleteFilter = (index) => {
        if (filters.length > 1) {
            setFilters(filters.filter((_, i) => i !== index));
        }
    };

    const handleFilterChange = (index, field, newValue) => {
        const updatedFilters = [...filters];
        updatedFilters[index][field] = newValue;
        setFilters(updatedFilters);
    };

    const handleApply = () => {
        onApplyFilters(filters);
    };

    return (
        <Paper style={{ padding: 20, width: '40%', marginLeft: 'auto', marginRight: 'auto' }}>
            <h2>Filter Trips</h2>
            {filters.map((filter, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                    <TextField
                        select
                        label="Filter Type"
                        value={filter.type}
                        onChange={(e) => handleFilterChange(index, 'type', e.target.value)}
                        style={{ marginRight: 10, width: '30%' }}
                    >
                        {filterOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Value"
                        value={filter.value}
                        onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
                        style={{ width: '60%', marginRight: 10 }}
                        type={filter.type === 'date' ? 'date' : 'text'}
                        InputLabelProps={filter.type === 'date' ? { shrink: true } : {}}
                    />

                    {/* Delete button, only shown if more than one filter box */}
                    {filters.length > 1 && (
                        <IconButton
                            color="error"
                            onClick={() => handleDeleteFilter(index)}
                            aria-label="delete filter"
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}
                </div>
            ))}

            <Button variant="contained" color="primary" onClick={handleApply} sx={{ m: 1 }}>
                Search
            </Button>
            <Button variant="contained" color="secondary" onClick={onReset} sx={{ m: 1 }}>
                Reset
            </Button>
            <Button variant="outlined" onClick={handleAddFilter} sx={{ m: 1 }}>
                Add Filter
            </Button>
        </Paper>
    );
};

export default Filter;