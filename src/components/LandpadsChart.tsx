import React from 'react'
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function LandpadsChart({ landpadsData }: { landpadsData: LandingZone[] }) {
    const landpads = landpadsData.map((landpad) => landpad.type);
    const landpadsByType: { [key: string]: number } = {};
    landpads.forEach((landpad) => {
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

    return (
        <div>
            <h2>Types of landpads</h2>
            <Pie data={data} />
        </div>
    )
}
