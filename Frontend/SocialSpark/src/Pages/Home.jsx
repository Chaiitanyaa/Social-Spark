import React from 'react';
import FeatureCard from '../components/FeatureCard';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 to-blue-900 text-white font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 shadow-lg">
        <div className="text-2xl font-bold">Social-Spark</div>
        <div className="space-x-6">
          <a href="#" className="hover:underline">For Brands</a>
          <a href="#" className="hover:underline">For Influencers</a>
          <Link to="/login">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg">Login</button>
          </Link>
          <Link to="/signup">
            <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg">Sign Up</button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Ignite Your Social Influence with Social-Spark
        </h1>
        <p className="text-lg mb-8">
          Connect brands with influencers. Amplify your reach. Spark conversations.
        </p>
        <button className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-full text-lg">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 px-8 md:px-16">
        <FeatureCard
          icon="✨"
          title="Discover Perfect Matches"
          description="Our AI-powered algorithm connects brands with the ideal influencers for their campaigns."
          iconColor="text-yellow-400"
        />
        <FeatureCard
          icon="🎯"
          title="Target Your Audience"
          description="Reach your desired demographic with precision through our extensive network of influencers."
          iconColor="text-green-400"
        />
        <FeatureCard
          icon="⚡"
          title="Amplify Your Impact"
          description="Boost your brand awareness and engagement with our proven influencer marketing strategies."
          iconColor="text-blue-400"
        />
      </section>
    </div>
  );
}
