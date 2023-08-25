"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { spaceXApiCaller } from '@/services/spaceX';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { BsFillRocketTakeoffFill } from 'react-icons/bs';
import { IoArrowBackCircle } from 'react-icons/io5';
import RocketSlider from '@/components/Slider';

export default function Rocket({ Id }: { Id: Params }) {
    const [rocket, setRocket] = useState<Rocket | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRocket = async () => {
            const rocketData = await spaceXApiCaller('v4/rockets', Id);
            if (rocketData && Object.keys(rocketData).length > 0) {
                setRocket(rocketData);
                setLoading(false);
            } else {
                setLoading(false);
                setError('Rocket data not found.');
            }
        }
        if ([Id]) {
            fetchRocket();
        }
    }, [Id]);


    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
            {loading && <p>Loading...</p>}
            {error && (
                <div className="flex flex-col items-center">
                    <p className="text-red-500 my-5">{error}</p>
                    <Link href={'../'} className='border-2 border-blue-800 bg-blue-700 rounded-xl p-2 my-5'>Go back to home page</Link>
                </div>)
            }
            {rocket && (
                <div>
                    <h2 className="text-2xl font-semibold my-4 flex">
                        <Link href={'../'} className='text-blue-300 text-[40px] mr-5 ease-linear hover:shadow-slate-700 hover:drop-shadow-lg transition duration-200'>
                            <IoArrowBackCircle title='Go back' />
                        </Link>
                        {rocket.name}
                        <BsFillRocketTakeoffFill></BsFillRocketTakeoffFill></h2>
                    <RocketSlider slideImages={rocket.flickr_images}></RocketSlider>
                    <div className='w-full md:w-[600px]'>
                        <p className="text-gray-300">{rocket.description}</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 w-80 text-gray-400">
                            <div>Height:</div><div className='text-gray-200'>{rocket.height.meters} meters</div>
                            <div>Diameter:</div><div className='text-gray-200'>{rocket.diameter.meters} meters</div>
                            <div>Mass:</div><div className='text-gray-200'>{rocket.mass.kg} kg</div>
                            <div>Boosters:</div><div className='text-gray-200'>{rocket.boosters}</div>
                            <div>Type:</div><div className='text-gray-200'>{rocket.type.charAt(0).toUpperCase() + rocket.type.slice(1)}</div>
                            <div>Active:</div><div className='text-gray-200'>{rocket.active ? 'Yes' : 'No'}</div>
                            <div>Stages:</div><div className='text-gray-200'>{rocket.stages}</div>
                            <div>Cost per Launch:</div><div className='text-gray-200'>${Intl.NumberFormat('en-US').format(rocket.cost_per_launch)}</div>
                            <div>Success Rate:</div><div className='text-gray-200'>{rocket.success_rate_pct}%</div>
                            <div>First Flight:</div><div className='text-gray-200'>{rocket.first_flight}</div>
                            <div>Country:</div><div className='text-gray-200'>{rocket.country}</div>
                            <div>Engine Type:</div><div className='text-gray-200'>{rocket.engines.type.charAt(0).toUpperCase() + rocket.engines.type.slice(1)}</div>
                            <div>Engine Number:</div><div className='text-gray-200'>{rocket.engines.number}</div>
                            <div>Engine Version:</div><div className='text-gray-200'>{rocket.engines.version}</div>
                            <div>Landing Legs:</div><div className='text-gray-200'>{rocket.landing_legs.number}</div>
                            <a href={rocket.wikipedia} className="text-blue-400 mt-4 inline-flex items-center">
                                Read more <FaExternalLinkAlt className="ml-1" />
                            </a>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
