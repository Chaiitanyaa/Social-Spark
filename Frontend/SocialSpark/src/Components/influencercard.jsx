import React from 'react';

export default function InfluencerCard({ influencer }) {
  return (
    <div className="bg-blue-700 text-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-bold">{influencer.name}</h3>
      <p className="mt-2">Followers: {influencer.followers}</p>
      <p className="mt-1">Category: {influencer.category}</p>
      <p className="mt-1">Bio: {influencer.bio}</p>
    </div>
  );
}
