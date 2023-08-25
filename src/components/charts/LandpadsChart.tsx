"use client"

import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import { NODE_SERVER_URL_API } from '@/utils/constants';

Chart.register(...registerables);

export default function LandpadsChart() {
    const [landpads, setLandpads] = useState<LandpadTypesUsed[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function updateLandpadsData() {
            try {
                const response = await axios.get(`${NODE_SERVER_URL_API}/get-landpad-type-data`);
                setLandpads(response.data);
                setLoading(false);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                }
                setLoading(false);
            }
        }
        updateLandpadsData()
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    let data;
    if (landpads.length > 0) {
        // Prepare data for the Pie chart
        data = {
            labels: Object.keys(landpads[0]).map((label) => label.toUpperCase()),
            datasets: [
                {
                    label: 'How many of this type were used',
                    data: Object.values(landpads[0]),
                    backgroundColor: ['rgba(75, 192, 192, 0.6)',
                        'rgba(244, 0, 5, 0.6)'
                    ],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };

        return (
            <div>
                <h2>Types of landpads</h2>
                <Pie data={data} />
            </div>
        )

    } else {
        setLoading(true);
    }
}
