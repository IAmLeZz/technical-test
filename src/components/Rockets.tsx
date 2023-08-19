import React from 'react';
import './Rockets.css'

const Rockets = ({ rockets }: { rockets: Rocket[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[100%] md:w-[95%] m-auto">
      {rockets.map((rocket) => (
        <div
          key={rocket.id}
          className="bg-dark border-2 border-gray-100 rounded-lg p-6 rocket-box"
        >
          <h3 className="text-xl font-semibold mb-2">{rocket.name}</h3>
          <p className="text-gray-500 mb-2">
            First flight: {new Date(rocket.first_flight).toLocaleDateString()}
          </p>
          <p className="">
            Status:{' '}
            {rocket.active ? (
              <span className="text-green-600">Active</span>
            ) : (
              <span className="text-red-600">Inactive</span>
            )}
          </p>
          <p className="text-gray-500 mb-4">{rocket.description}</p>
          <p className="mb-2">
            Success rate: {rocket.success_rate_pct}%
          </p>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <p className="text-gray-500">{rocket.country} </p>
            </div>
            <p>{rocket.height.meters}m</p>
            <p className="text-blue-500 font-semibold">
              Cost per launch: ${rocket.cost_per_launch.toLocaleString()}
            </p>
          </div>
          <img
            src={rocket.flickr_images[0]}
            className="rounded-lg w-full"
            alt={rocket.name}
          />
        </div>
      ))}
    </div>
  );
};

export default Rockets;