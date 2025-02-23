import jwtDecode from 'jwt-decode';

// Function to decode JWT and get user information
export const getUserFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded; // Expected to include user info like username, email, etc.
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
