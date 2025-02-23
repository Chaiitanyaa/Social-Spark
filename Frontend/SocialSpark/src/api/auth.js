import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Replace with your backend URL

// Login API
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    return response.data; // Expected: { token, user }
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

// Register API
export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      name,
      email,
      password,
    });
    return response.data; // Expected: { message: 'User created successfully' }
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};
