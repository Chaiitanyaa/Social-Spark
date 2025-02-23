import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('company'); // Default role
  const [error, setError] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await registerUser(name, email, password, role);
      navigate('/login'); // Redirect to login page after successful signup
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white relative">
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all shadow-lg"
      >
        ← Back to Home
      </button>

      {/* Signup Form with Glassmorphism */}
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-4xl font-bold text-center mb-8">Create Your Account</h2>

        <form onSubmit={handleSignup} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400"
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
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400"
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
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Role Dropdown */}
          <div className="relative">
            <label className="block text-sm mb-2">Role</label>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white text-left focus:ring-2 focus:ring-blue-400"
            >
              {role.charAt(0).toUpperCase() + role.slice(1)} ▼
            </button>
            {dropdownOpen && (
              <ul className="absolute w-full bg-white/20 backdrop-blur-lg rounded-lg shadow-lg mt-2 z-10">
                <li
                  onClick={() => {
                    setRole('company');
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-white/30 cursor-pointer rounded-t-lg"
                >
                  Company
                </li>
                <li
                  onClick={() => {
                    setRole('influencer');
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-white/30 cursor-pointer rounded-b-lg"
                >
                  Influencer
                </li>
              </ul>
            )}
          </div>

          {/* Error Message */}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg shadow-lg transition-all"
          >
            Sign Up
          </button>
        </form>

        {/* Login Redirect */}
        <p className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="underline hover:text-blue-400">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
