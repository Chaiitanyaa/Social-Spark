import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('company'); // Default role
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('Submitting Registration:', { name, email, password, role });

    try {
      const response = await registerUser(name, email, password, role);
      console.log('Registration Success:', response);
      navigate('/login'); // Redirect on success
    } catch (err) {
      console.error('Signup Error:', err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-700 to-blue-900 text-white">
      <div className="bg-blue-800 p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Create Your Account</h2>

        <form onSubmit={handleSignup} className="space-y-6">
          {/* Full Name Field */}
          <div>
            <label className="block text-sm mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 rounded-lg bg-blue-700 text-white focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-blue-700 text-white focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-4 py-2 rounded-lg bg-blue-700 text-white focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Role Dropdown */}
          <div className="relative">
            <label className="block text-sm mb-2">Role</label>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full px-4 py-2 rounded-lg bg-blue-700 text-white focus:ring-2 focus:ring-blue-400 text-left"
            >
              {role.charAt(0).toUpperCase() + role.slice(1)} ▼
            </button>

            {dropdownOpen && (
              <ul className="absolute w-full bg-blue-700 rounded-lg shadow-lg mt-2 z-10">
                <li
                  onClick={() => {
                    setRole('company');
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-blue-600 cursor-pointer rounded-t-lg"
                >
                  Company
                </li>
                <li
                  onClick={() => {
                    setRole('influencer');
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-blue-600 cursor-pointer rounded-b-lg"
                >
                  Influencer
                </li>
              </ul>
            )}
          </div>

          {/* Error Display */}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg ${
              loading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>

        {/* Redirect to Login */}
        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/login" className="underline hover:text-blue-400">Login here</Link>
        </p>
      </div>
    </div>
  );
}
