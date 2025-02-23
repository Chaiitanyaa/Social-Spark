import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchInfluencers } from '../api/influencer';
import InfluencerCard from '../components/InfluencerCard';
import SearchHistorySidebar from '../components/SearchHistorySidebar';
import { getUserFromToken } from '../utils/auth';

export default function Dashboard() {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [username, setUsername] = useState('');

  // Load search history and user info from token
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(savedHistory);

    const user = getUserFromToken();
    if (user && user.username) {
      setUsername(user.username);
    }
  }, []);

  // Update search history
  const updateSearchHistory = (newSearch) => {
    let updatedHistory = [newSearch, ...searchHistory.filter((item) => item !== newSearch)];
    if (updatedHistory.length > 10) updatedHistory = updatedHistory.slice(0, 10);
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  // Clear all search history
  const handleClearAllSearches = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  // Delete an individual search
  const handleDeleteSearch = (searchToDelete) => {
    const updatedHistory = searchHistory.filter((item) => item !== searchToDelete);
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Handle search
  const handleSearch = async (searchQuery) => {
    const query = searchQuery || description;
    setLoading(true);
    setError('');
    setInfluencers([]);

    try {
      const data = await searchInfluencers(query);
      if (data.length > 0) {
        setInfluencers(data);
        updateSearchHistory(query);
      } else {
        setError('No influencers found for the given description.');
      }
    } catch (err) {
      setError(err.message || 'Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle selecting a past search from the sidebar
  const handleHistorySelect = (pastSearch) => {
    setDescription(pastSearch);
    handleSearch(pastSearch);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400 text-white flex">
      {/* Sidebar */}
      <SearchHistorySidebar
        history={searchHistory}
        onSelect={handleHistorySelect}
        onClearAll={handleClearAllSearches}
        onDelete={handleDeleteSearch}
      />

      {/* Main Content */}
      <div className="flex-1 ml-72 p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold">
            Welcome to Your Dashboard{username ? `, ${username}` : ''}
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-400 text-white py-2 px-6 rounded-lg shadow-lg transition-all"
          >
            Logout
          </button>
        </div>

        {/* Search Section */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg text-center mb-6">
          <h2 className="text-2xl font-bold mb-4">Find Influencers</h2>
          <input
            type="text"
            placeholder="Enter a description (e.g., art, fashion, fitness)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white focus:ring-2 focus:ring-blue-300 mb-4 placeholder-gray-300"
          />
          <button
            onClick={() => handleSearch()}
            className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-2 rounded-lg shadow-lg transition-all"
          >
            {loading ? 'Searching...' : 'Search Influencers'}
          </button>
        </div>

        {/* Display Influencers */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  );
}
