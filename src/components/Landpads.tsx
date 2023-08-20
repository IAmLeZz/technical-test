import React from 'react'
import { FaWikipediaW } from 'react-icons/fa'

export default function Landpads({ landpadsData }: { landpadsData: LandingZone[] }) {
  return (
    <div className="bg-gray-900 text-white p-4 my-5">
      <h1 className="text-4xl font-bold mb-8">Landpads</h1>
      <div className="grid grid-cols-3 gap-4">
        {landpadsData.map((landpad) => (
          <div
            key={landpad.id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={landpad.images.large[0]}
              alt={landpad.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{landpad.full_name}</h2>
              <p className="text-sm text-gray-400 mb-4">{landpad.details}</p>
              <ul className="text-sm text-gray-300 flex flex-wrap gap-2 mb-4">
                <li>
                  <span className="font-bold">Name:</span> {landpad.name}
                </li>
                <li>
                  <span className="font-bold">Status:</span> {landpad.status}
                </li>
                <li>
                  <span className="font-bold">Type:</span> {landpad.type}
                </li>
                <li>
                  <span className="font-bold">Locality:</span> {landpad.locality}
                </li>
                <li>
                  <span className="font-bold">Region:</span> {landpad.region}
                </li>
                <li>
                  <span className="font-bold">Latitude:</span> {landpad.latitude}
                </li>
                <li>
                  <span className="font-bold">Longitude:</span> {landpad.longitude}
                </li>
                <li>
                  <span className="font-bold">Landing attempts:</span>{' '}
                  {landpad.landing_attempts}
                </li>
                <li>
                  <span className="font-bold">Landing successes:</span>{' '}
                  {landpad.landing_successes}
                </li>
              </ul>
              <a
                href={landpad.wikipedia}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 flex items-center hover:underline"
              >
                <FaWikipediaW className="mr-1" /> Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}