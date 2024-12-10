import React, { useEffect, useState } from 'react';
import AxiosHelper from '../Helper/AxiosHelper';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { CircularProgress } from '@mui/material';
import NavbarMap from '../Component/NavbarMap'
import LineChart from '../Component/LineChart';

// Register chart components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function ChartPage() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const fetchHandler = async (pageNumber) => {
    const offset = (pageNumber - 1) * rowsPerPage;
    const params = {
      $offset: offset,
      $limit: rowsPerPage,
    };

    setLoading(true);
    try {
      const data = await AxiosHelper.get('', params);

      // Transform data for the chart
      const labels = data.map((item) => new Date(item.pickup_datetime).toLocaleDateString());
      const distances = data.map((item) => parseFloat(item.trip_distance));
      const fare = data.map((item) => item.fare_amount);

      setChartData({
        labels, // X-axis labels
        datasets: [
          {
            label: 'Trip Distance (miles)',
            data: distances, // Y-axis data
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            fill: true,
            tension: 0.4, // Smooth line
          },
          {
            label: 'Fare',
            data: fare, // Y-axis data
            borderColor: 'red',
            backgroundColor: 'rgba(205, 51, 27, 0.1)',
            fill: true,
            tension: 0.4, // Smooth line
          },
        ],
      });
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHandler(page);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <NavbarMap>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div className='title' style={{ paddingTop: 10, paddingBottom: 10 }}>
          <h1> Taxi Line Chart</h1>
        </div>
        {loading ? (
          <p><CircularProgress /></p>
        ) : chartData ? (
          <LineChart 
            data={chartData}
            count={Math.ceil(1000 / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
          />
        ) : (
          <p>No data available</p>
        )}
      </div>
    </NavbarMap>
  );
}

export default ChartPage;