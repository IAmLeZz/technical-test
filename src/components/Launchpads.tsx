import React, { useEffect, useRef, useState } from 'react'
import useSpaceXData from '../hooks/useSpaceXData'
import { replaceRocketIdsWithNames } from '@/services/rocketsNames'
import { FaRocket } from 'react-icons/fa'

export default function Launchpads() {
    const [launchpadsData, setLaunchpadsData] = useState<LaunchPad[]>([])
    const { data, loading, error } = useSpaceXData({ endpoint: 'v4/launchpads' })

    // Update launchpads data when data from useSpaceXData hook changes
    useEffect(() => {
        async function updateLaunchpadsData() {
            const updatedData: LaunchPad[] = await replaceRocketIdsWithNames(data)
            setLaunchpadsData(updatedData)
        }
        updateLaunchpadsData()
    }, [data])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className="bg-gray-900 text-white p-4">
            <h1 className="text-4xl font-bold mb-8">Launchpads</h1>
            <div className="grid grid-cols-3 gap-4">
                {launchpadsData.map((launchpad: LaunchPad) => (
                    <div
                        key={launchpad.id}
                        className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                    >
                        <img
                            src={launchpad.images.large[0]}
                            alt={launchpad.name}
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
function scrollIntoView(arg0: string): string {
    throw new Error('Function not implemented.')
}

