import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchInfluencers } from '../api/influencer';
import InfluencerCard from '../components/InfluencerCard';

export default function Dashboard() {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token on logout
    navigate('/login');
  };

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setInfluencers([]);

    try {
      const data = await searchInfluencers(description);
      setInfluencers(data); // Set influencers data from response
    } catch (err) {
      setError(err.message || 'Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
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

      {/* Search Section */}
      <div className="bg-blue-800 p-6 rounded-lg shadow-lg text-center mb-6">
        <h2 className="text-2xl font-semibold mb-4">Find Influencers</h2>
        <input
          type="text"
          placeholder="Enter a description (e.g., fashion, fitness)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-blue-700 text-white focus:ring-2 focus:ring-blue-400 mb-4"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg"
        >
          {loading ? 'Searching...' : 'Search Influencers'}
        </button>
      </div>

      {/* Display Influencers */}
      <div className="mt-6">
        {error && <p className="text-red-400 text-center">{error}</p>}
        {influencers.length > 0 ? (
          influencers.map((influencer) => (
            <InfluencerCard key={influencer.id} influencer={influencer} />
          ))
        ) : (
          !loading && <p className="text-center">No influencers found yet. Try searching.</p>
        )}
      </div>
    </div>
  );
}
