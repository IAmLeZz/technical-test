import React from 'react';
import { FaTwitter, FaFlickr, FaGlobe } from 'react-icons/fa';

function SpaceXCard({ spaceXData }: {spaceXData: SpaceXInfo}) {
  // Destructure the data object
  const {
    name,
    founder,
    founded,
    employees,
    vehicles,
    launch_sites,
    test_sites,
    ceo,
    cto,
    coo,
    cto_propulsion,
    valuation,
    summary,
    headquarters: { address, city, state },
    links: { website, flickr, twitter, elon_twitter },
  } = spaceXData;

  // Format the valuation number
  const formatValuation = (num: number) => {
    return num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden py-4 mt-5">
      <div className="flex items-center justify-center px-6 py-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/SpaceX-Logo.svg/1280px-SpaceX-Logo.svg.png"
          alt="SpaceX logo"
          className="h-16 w-auto"
        />
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-600 text-sm">{summary}</p>
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-800">Details</h2>
          <ul className="mt-2 text-gray-600 text-sm">
            <li>
              <strong>Founder:</strong> {founder}
            </li>
            <li>
              <strong>Founded:</strong> {founded}
            </li>
            <li>
              <strong>Employees:</strong> {employees}
            </li>
            <li>
              <strong>Vehicles:</strong> {vehicles}
            </li>
            <li>
              <strong>Launch sites:</strong> {launch_sites}
            </li>
            <li>
              <strong>Test sites:</strong> {test_sites}
            </li>
            <li>
              <strong>CEO:</strong> {ceo}
            </li>
            <li>
              <strong>CTO:</strong> {cto}
            </li>
            <li>
              <strong>COO:</strong> {coo}
            </li>
            <li>
              <strong>CTO of propulsion:</strong> {cto_propulsion}
            </li>
            <li>
              <strong>Valuation:</strong> {formatValuation(valuation)}
            </li>
          </ul>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-800">Headquarters</h2>
          <p className="mt-2 text-gray-600 text-sm">
            {address}, {city}, {state}
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-800">Links</h2>
          <div className="mt-2 flex items-center space-x-4 text-gray-600 text-sm">
            {/* Website link */}
            <a href={website} target="_blank" rel="noreferrer">
              <FaGlobe className="w-5 h-5" />
            </a>

            {/* Flickr link */}
            <a href={flickr} target="_blank" rel="noreferrer">
              <FaFlickr className="w-5 h-5" />
            </a>

            {/* Twitter link */}
            <a href={twitter} target="_blank" rel="noreferrer">
              <FaTwitter className="w-5 h-5" />
            </a>

            {/* Elon Musk's Twitter link */}
            <a href={elon_twitter} target="_blank" rel="noreferrer">
              @elonmusk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpaceXCard;