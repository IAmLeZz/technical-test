import React from 'react';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
const PayloadsChart = ({ payload }: { payload: Payload[] }) => {
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
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };



  return (
    <div>
      <h2>Types of payloads launched by SpaceX</h2>
      <Doughnut data={chartData} />
    </div>
  );
};

export default PayloadsChart;