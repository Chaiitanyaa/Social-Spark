import React from 'react';

export default function InfluencerCard({ influencer }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg text-white p-6 rounded-2xl shadow-lg transition-transform hover:scale-105 hover:shadow-2xl flex flex-col gap-4">
      {/* Profile Image and Basic Info */}
      <div className="flex items-center gap-4">
        <img
          src={influencer.profileImg}
          alt={influencer.name}
          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
        />
        <div>
          <h3 className="text-2xl font-bold">{influencer.name}</h3>
          <p className="text-sm text-gray-200">@{influencer.username}</p>
          <p className="text-sm text-gray-300">Category: {influencer.categoryName} | Country: {influencer.country}</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-4 text-sm text-gray-300">
        <p>Followers: {influencer.followers.toLocaleString()}</p>
        <p>Total Posts: {influencer.totalPosts} | Total Views: {influencer.totalViews.toLocaleString()}</p>
      </div>

      {/* Description */}
      <p className="mt-2 text-sm">{influencer.description}</p>

      {/* Action Buttons */}
      <div className="mt-4 space-x-4">
        <a
          href={influencer.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg transition-all"
        >
          Visit Profile
        </a>
        {influencer.sampleVideo && (
          <a
            href={influencer.sampleVideo}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg transition-all"
          >
            Watch Sample Video
          </a>
        )}
      </div>
    </div>
  );
}
