"use client"

import React, { useEffect, useState } from 'react';
import './Rockets.css'
import Image from 'next/image';
import Link from 'next/link';
import useSpaceXData from '@/hooks/useSpaceXData';

const Rockets = () => {
  const [rockets, setRockets] = useState<Rocket[]>([]);
  const { data: rocketsData, error, loading } = useSpaceXData({ endpoint: 'v4/rockets' })

  useEffect(() => {
    async function updateRocketData() {
      if (rocketsData) {
        setRockets(rocketsData)
      } else {
        error
      }
    }
    updateRocketData()
  }, [rocketsData, error])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <div className='bg-gray-900 text-white py-10 mt-5 opacity-0 slide-in-rockets'>
        <h3 className='text-4xl font-bold px-2'>Our rockets, our pride</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[100%] md:w-[95%] m-auto my-5">
          {rockets?.map((rocket) => (
            <div
              key={rocket.id}
              id={rocket.id}
              className="bg-dark border-2 border-gray-100 rounded-lg p-6 rocket-box"
              title='Click here to read more'
            >
              <Link key={rocket.id} href={`rocket/${rocket.id}`}>
                <h3 className="text-xl font-semibold mb-2">{rocket.name}</h3>
                <p className="text-gray-400 mb-2">
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
                <p className="text-gray-400 mb-4">{rocket.description}</p>
                <p className="mb-2">
                  Success rate: {rocket.success_rate_pct}%
                </p>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <p className="text-gray-400">{rocket.country} </p>
                  </div>
                  <p>{rocket.height.meters}m</p>
                  <p className="text-blue-400 font-semibold">
                    Launch cost: ${rocket.cost_per_launch.toLocaleString()}
                  </p>
                </div>
                <Image
                  src={rocket.flickr_images[0]}
                  className="rounded-lg w-full"
                  alt={rocket.name}
                  width={500}
                  height={500}
                />
              </Link>
            </div>
          ))}
        </div >
      </div>
    </>
  );
};

export default Rockets;
