"use client"

import React, { useEffect, useState } from 'react';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import useSpaceXData from '@/hooks/useSpaceXData';

Chart.register(...registerables);
const PayloadsChart = () => {
  const [payload, setPayload] = useState<Payload[]>([]);
  const { data: payloadsData, error, loading } = useSpaceXData({ endpoint: 'v4/payloads' })

  useEffect(() => {
    async function updatePayloadsData() {
      setPayload(payloadsData);
    }
    updatePayloadsData();
  }, [payloadsData])

  const payloadType = payload.map((payload) => payload.type);
  const payloadCountByType: { [payloadType: string]: number } = {};

  payloadType.forEach((type) => {
    if (payloadCountByType[type]) {
      payloadCountByType[type]++;
    } else {
      payloadCountByType[type] = 1;
    }
  });

  const chartData = {
    labels: Object.keys(payloadCountByType),
    datasets: [
      {
        label: 'Types of payloads',
        data: Object.values(payloadCountByType),
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

  return (
    <div>
      <h2>Types of payloads launched by SpaceX</h2>
      <Doughnut data={chartData} />
    </div>
  );
};

export default PayloadsChart;