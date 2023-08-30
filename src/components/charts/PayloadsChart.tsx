"use client"

import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import { NODE_SERVER_URL } from '@/utils/constants';

Chart.register(...registerables);
const PayloadsChart = () => {
  const [payload, setPayload] = useState<PayloadLaunched[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function updatePayloadsData() {
      try {
        const response = await axios.get(`${NODE_SERVER_URL}/get-payload-data`);
        setPayload(response.data);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err?.message);
        }
        setLoading(false);
      }
    }
    updatePayloadsData();
  }, [])

  const chartData = {
    labels: payload.map((payload) => payload.type_of_payload),
    datasets: [
      {
        label: 'Total times launched',
        data: payload.map((payload) => payload.times_launched),
        backgroundColor: ['rgba(82, 145, 125, 0.6)',
          'rgba(190, 231, 146, 0.6)',
          'rgba(58, 40, 145, 0.6)',
          'rgba(232, 70, 90, 0.6)',
          'rgba(168, 0, 194, 0.6)',
          'rgba(0, 115, 215, 0.6)',
          'rgba(192, 80, 55, 0.6)'
        ],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  if (payload.length > 0) {
    return (
      <div>
        <h2 className='text-gray-100'>Types of payloads launched by SpaceX</h2>
        <Doughnut data={chartData} />
      </div>
    );
  } else {
    setLoading(true)
  }

};

export default PayloadsChart;