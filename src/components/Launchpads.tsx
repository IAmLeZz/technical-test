"use client"

import React, { ChangeEvent, useEffect, useState } from 'react'
import useSpaceXData from '../hooks/useSpaceXData'
import { replaceRocketIdsWithNames } from '@/services/rocketsNames'
import { FaRocket } from 'react-icons/fa'
import Image from 'next/image'

export default function Launchpads() {
    const [launchpadsData, setLaunchpadsData] = useState<LaunchPad[]>([])
    const { data, loading, error } = useSpaceXData({ endpoint: 'v4/launchpads' })

    // Declare a state variable for filter criteria
    const [filter, setFilter] = useState({
        status: '',
        locality: '',
        region: '',
        rocket: '',
    })

    // Handle form submission and update filter state
    const handleFilter = (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault()
        const { name, value } = event.target
        setFilter((prevFilter) => ({
            ...prevFilter,
            [name]: value,
        }))
    }

    // Update launchpads data when data from useSpaceXData hook changes
    useEffect(() => {
        async function updateLaunchpadsData() {
            if (data) {
                const updatedData: LaunchPad[] = await replaceRocketIdsWithNames(data)
                setLaunchpadsData(updatedData)
            } else {
                error
            }
        }
        updateLaunchpadsData()
    }, [data, error])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    // Filter launchpads data based on filter state
    const filteredLaunchpads = launchpadsData?.filter((launchpad) => {
        return (
            (filter.status === '' || filter.status === launchpad.status) &&
            (filter.locality === '' ||
                filter.locality.toUpperCase() === launchpad.locality.toUpperCase()) &&
            (filter.region === '' ||
                filter.region.toUpperCase() === launchpad.region.toUpperCase()) &&
            (filter.rocket === '' ||
                launchpad.rockets.some((rocket) => rocket === filter.rocket))
        )
    })
    const statuses = Array.from(
        new Set(launchpadsData.map(launchpad => launchpad.status))
    )

    const localities = Array.from(
        new Set(launchpadsData.map((launchpad) => launchpad.locality))
    )
    const regions = Array.from(
        new Set(launchpadsData.map((launchpad) => launchpad.region))
    )
    const rockets = Array.from(
        new Set(launchpadsData.flatMap((launchpad) => launchpad.rockets))
    )

    // Map values to options for select elements

    const statusOptions = statuses.map((status) => ({
        value: status,
        label: status.charAt(0).toUpperCase() + status.slice(1),
    }))

    const localityOptions = localities.map((locality) => ({
        value: locality,
        label: locality,
    }))
    const regionOptions = regions.map((region) => ({
        value: region,
        label: region,
    }))
    const rocketOptions = rockets.map((rocket) => ({
        value: rocket,
        label: rocket,
    }))

    return (
        <div className="bg-gray-900 text-white p-4">
            <h1 className="text-4xl font-bold mb-8">Launchpads</h1>
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
                <label htmlFor="locality" className="text-gray-300 mr-2">
                    Locality:
                </label>
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
                <label htmlFor="region" className="text-gray-300 mr-2">
                    Region:
                </label>
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
                <label htmlFor="rocket" className="text-gray-300 mr-2">Rocket:</label>
                <select
                    name="rocket"
                    id="rocket"
                    onChange={handleFilter}
                    className="bg-gray-800 text-gray-300 border border-gray-600 rounded mr-4"
                >
                    <option value="">All</option>
                    {rocketOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </form>
            {/* Use filteredLaunchpads instead of launchpadsData */}
            <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
                {filteredLaunchpads.map((launchpad: LaunchPad) => (
                    <div
                        key={launchpad.id}
                        className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                    >
                        <Image
                            src={launchpad.images.large[0]}
                            alt={launchpad.name}
                            width={500}
                            height={500}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{launchpad.full_name}</h2>
                            <p className="text-sm text-gray-400 mb-4">{launchpad.details}</p>
                            <ul className="text-sm text-gray-300 flex flex-wrap gap-2 mb-4">
                                <li>
                                    <span className="font-bold">Name:</span> {launchpad.name}
                                </li>
                                <li>
                                    <span className="font-bold">Status:</span> {launchpad.status}
                                </li>
                                <li>
                                    <span className="font-bold">Locality:</span> {launchpad.locality}
                                </li>
                                <li>
                                    <span className="font-bold">Region:</span> {launchpad.region}
                                </li>
                                <li>
                                    <span className="font-bold">Latitude:</span> {launchpad.latitude}
                                </li>
                                <li>
                                    <span className="font-bold">Longitude:</span> {launchpad.longitude}
                                </li>
                                <li>
                                    <span className="font-bold">Launch attempts:</span>{' '}
                                    {launchpad.launch_attempts}
                                </li>
                                <li>
                                    <span className="font-bold">Launch successes:</span>{' '}
                                    {launchpad.launch_successes}
                                </li>
                            </ul>
                            {launchpad.rockets.length > 0 && (
                                <div className="flex items-center text-blue-400">
                                    <FaRocket className="mr-1" /> Rockets: {launchpad.rockets.join(', ')}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}