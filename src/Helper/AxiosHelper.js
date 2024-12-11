import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
    // baseURL: 'http://localhost:5000/api/yellow-taxi-data', // Set default API base URL
    baseURL: 'https://ganahpati-be.vercel.app/api/yellow-taxi-data', // Set default API base URL
    timeout: 10000, // Set default timeout (10 seconds)
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: true, // Include credentials in requests
});

// Response interceptor (Optional)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle response errors globally
        console.error('Response error:', error.response || error.message);
        return Promise.reject(error.response || error.message);
    }
);

// Axios helper functions
const AxiosHelper = {
    get: async (url, params = {}, headers = {}) => {
        try {
            const response = await apiClient.get(url, { params, headers });
            console.log('response helper', response.data)
            return response.data;
        } catch (error) {
            throw error; // Allow the calling function to handle the error
        }
    },

    post: async (url, data = {}, headers = {}) => {
        try {
            const response = await apiClient.post(url, data, { headers });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    put: async (url, data = {}, headers = {}) => {
        try {
            const response = await apiClient.put(url, data, { headers });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    delete: async (url, headers = {}) => {
        try {
            const response = await apiClient.delete(url, { headers });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default AxiosHelper;