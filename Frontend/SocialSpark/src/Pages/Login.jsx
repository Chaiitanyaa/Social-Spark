import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.token); // Save JWT token
      navigate('/dashboard'); // Redirect to Dashboard after login
    } catch (err) {
      setError(err.message || 'Login failed');
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

      {/* Login Form with Glassmorphism */}
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-4xl font-bold text-center mb-8">Login to Social-Spark</h2>

        <form onSubmit={handleLogin} className="space-y-6">
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
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg shadow-lg transition-all"
          >
            Login
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="mt-6 text-center text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="underline hover:text-blue-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
