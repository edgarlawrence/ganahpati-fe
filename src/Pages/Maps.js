import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import CircularProgress from '@mui/material/CircularProgress';
import MapTable from '../Component/MapTable';
import NavbarMap from '../Component/NavbarMap';
import Filter from '../Component/Filter';
import Map from '../Component/Map';
import AxiosHelper from '../Helper/AxiosHelper';

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = () => {
    const [trips, setTrips] = useState([]);
    const [data, setData] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [datePickup, setDatePickup] = useState(dayjs('2014-01-01T00:00:00.000'));
    const [fare, setFare] = useState('');
    const [trip, setTrip] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 10;


    const handleChange = (event, value) => {
        setPage(value);
    };

    const fetchData = async (pageNumber) => {
        setLoading(true);
        const offset = (pageNumber - 1) * rowsPerPage;
        const params = {
            $offset: offset,
            $limit: rowsPerPage,
        };
        try {
            const response = await AxiosHelper.get('', params);
            console.log('Page:', page, 'Offset:', offset);
            setTrips(response);
            setData(response);
            console.log('Initial data:', response);
        } catch (error) {
            console.error('Error fetching the trip data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    dayjs.extend(utc);

    const fetchFilterData = async (filters) => {
        setLoading(true);
        try {
            const params = filters.reduce((acc, filter) => {
                if (filter.type === 'fare') acc.fare_amount = filter.value;
                if (filter.type === 'distance') acc.trip_distance = filter.value;
                if (filter.type === 'payment') acc.payment_type = filter.value;
                if (filter.type === 'date') acc.pickup_datetime = dayjs(filter.value).utc().format('YYYY-MM-DDTHH:mm:ss');
                return acc;
            }, {});

            console.log('Full API Request URL:', await AxiosHelper.get('', params));

            const response = await AxiosHelper.get('', params);

            console.log('Filtered Data Response:', response);

            setData(response);
        } catch (error) {
            console.error('Error fetching filtered data:', error.message, error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    const handlePickupChange = (newDate) => {
        setDatePickup(dayjs(newDate));
        // console.log('Pickup DateTime (UTC):', dayjs(newDate).format('YYYY-MM-DDTHH:mm:ss'));
    };

    const saveDataHandler = (trip) => {
        console.log('save data value', trip)
    }

    return (
        <NavbarMap>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 25 }}>
                <Map selectedTrip={selectedTrip} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 25 }}>
                <Filter
                    onApplyFilters={(filters) => fetchFilterData(filters)}
                    onReset={() => fetchData(page)}
                />
            </div>

            <div style={{ marginTop: 25 }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <MapTable
                            data={data}
                            bookmark={true}
                            onRowClick={(trip) => setSelectedTrip(trip)}
                            count={Math.ceil(1000 / rowsPerPage)}
                            page={page}
                            onPaginationChange={handleChange}
                        />
                    )}
                </div>
            </div>
        </NavbarMap>
    );
};

export default MapComponent;