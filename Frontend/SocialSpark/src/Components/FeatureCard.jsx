import React from 'react';

const FeatureCard = ({ icon, title, description, iconColor }) => {
  return (
    <div className="bg-blue-800 p-6 rounded-2xl shadow-md text-center">
      <div className={`text-3xl mb-4 ${iconColor}`}>{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;