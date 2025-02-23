import axios from 'axios';

const API_BASE_URL = 'http://localhost:5002'; // Replace with your backend URL

export const searchInfluencers = async (description) => {
  try {
    // Retrieve JWT token from localStorage
    const token = localStorage.getItem('token');

    // Set up headers with Authorization
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Attach JWT token
        'Content-Type': 'application/json'
      }
    };

    // Make API call with description and headers

    const response = await axios.post(`${API_BASE_URL}/api/influencers/find`, { description }, config);
    console.log('Influencers:', response.data);
    return response.data.influencers; // Extract influencer list from response
  } catch (error) {
    console.error('API Error:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Network Error');
  }
};
