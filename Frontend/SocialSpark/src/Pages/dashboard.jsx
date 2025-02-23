import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from local storage
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 to-blue-900 text-white p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="bg-blue-800 p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold">Your Activity Summary</h2>
        <p className="mt-4">You can manage your influencer campaigns, track engagement, and optimize strategies here.</p>
      </div>
    </div>
  );
}
