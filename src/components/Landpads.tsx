"use client"
import useLandpadsFilter from '@/hooks/useLandpadsFilter'
import useSpaceXData from '@/hooks/useSpaceXData'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaWikipediaW } from 'react-icons/fa'

export default function Landpads() {
  const [landpads, setLandpads] = useState<LandingZone[]>([])
  const { data: landpadsData, loading, error } = useSpaceXData({ endpoint: 'v4/landpads' })
  const { regionOptions, typesOptions, localityOptions, statusOptions, handleFilter, filteredLandpads } = useLandpadsFilter({ landpads })

  // Update launchpads data when data from useSpaceXData hook changes
  useEffect(() => {
    async function updateLaunchpadsData() {
      if (landpadsData) {
        setLandpads(landpadsData)
      } else {
        error
      }
    }
    updateLaunchpadsData()
  }, [landpadsData, error])


  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="bg-gray-900 text-white p-4 my-5">
      <h1 className="text-4xl font-bold mb-8">Landpads</h1>
      <form className="mb-4">
        <label htmlFor="status" className="text-gray-300 mr-2">Status:</label>
        <select
          name="status"
          id="status"
          onChange={handleFilter}
          className="bg-gray-800 text-gray-300 border border-gray-600 rounded mr-4"
        >
          <option value="">All</option>
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label htmlFor="type" className="text-gray-300 mr-2">Type:</label>
        <select name="type" id="type" onChange={handleFilter} className="bg-gray-800 text-gray-300 border border-gray-600 rounded mr-4">
          <option value="">All</option>
          {typesOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label htmlFor="locality" className="text-gray-300 mr-2">Locality:</label>
        <select
          name="locality"
          id="locality"
          onChange={handleFilter}
          className="bg-gray-800 text-gray-300 border border-gray-600 rounded mr-4"
        >
          <option value="">All</option>
          {localityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label htmlFor="region" className="text-gray-300 mr-2">Region:</label>
        <select
          name="region"
          id="region"
          onChange={handleFilter}
          className="bg-gray-800 text-gray-300 border border-gray-600 rounded mr-4"
        >
          <option value="">All</option>
          {regionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </form>
      {/* Use filteredLandpads instead of landpadsData */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 grid-cols-1">
        {filteredLandpads.map((landpad) => (
          <div
            key={landpad.id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <Image
              src={landpad.images.large[0]}
              alt={landpad.name}
              width={500}
              height={500}
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