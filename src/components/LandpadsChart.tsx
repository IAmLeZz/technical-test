"use client"
import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import useSpaceXData from '@/hooks/useSpaceXData';

Chart.register(...registerables);

export default function LandpadsChart() {
    const [landpads, setLandpads] = useState<LandingZone[]>([])
    const { data: landpadsData, loading, error } = useSpaceXData({ endpoint: 'v4/landpads' })

    useEffect(() => {
        async function updateLandpadsData() {
            setLandpads(landpadsData)
        }
        updateLandpadsData()
    }, [landpadsData])

    const landpadsTypes = landpads.map((landpad) => landpad.type);
    const landpadsByType: { [key: string]: number } = {};
    landpadsTypes.forEach((landpad) => {
        if (landpadsByType[landpad]) {
            landpadsByType[landpad]++;
        } else {
            landpadsByType[landpad] = 1;
        }
    });

    // Prepare data for the Bar chart
    const data = {
        labels: Object.keys(landpadsByType),
        datasets: [
            {
                label: 'Successful Launches',
                data: Object.values(landpadsByType),
                backgroundColor: ['rgba(75, 192, 192, 0.6)',
                    'rgba(244, 0, 5, 0.6)'
                ],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div>
            <h2>Types of landpads</h2>
            <Pie data={data} />
        </div>
    )
}
