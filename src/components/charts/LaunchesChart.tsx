"use client"

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import { NODE_SERVER_URL } from '@/utils/constants';

Chart.register(...registerables);

export default function LaunchesChart({ isSuccess }: { isSuccess: boolean }) {
  const [launches, setLaunches] = useState<LaunchYearlyResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function updateLaunchesData() {
      try {
        const response = await axios.get(`${NODE_SERVER_URL}/get-launch-data`);
        setLaunches(response.data);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err?.message);
        }
        setLoading(false);
      }
    }
    updateLaunchesData();
  }, [])

  // Prepare data for the Bar chart
  const data = {
    labels: launches.map((launch) => launch.year),
    datasets: [
      {
        label: isSuccess ? 'Successful launches' : 'Failed launches',
        data: launches.map((launch) => isSuccess ? launch.successful_launches : launch.failed_launches),
        backgroundColor: isSuccess ? 'rgba(75, 192, 192, 0.6)' : 'rgba(255, 99, 132, 0.6)',
        borderColor: isSuccess ? 'rgba(75, 192, 192, 1)' : 'rgba(255,99,132,1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  if (launches.length > 0) {
    return (
      <div>
        <h2 className='text-gray-100'>{isSuccess ? 'Successful launches by year' : 'Failed launches by year'}</h2>
        <Bar data={data} options={options} />
      </div>
    );
  } else {
    setLoading(true)
  }

}