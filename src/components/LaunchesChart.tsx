import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function LaunchesChart({ launches, isSuccess }: { launches: Launch[], isSuccess: boolean }) {
  const Launches = launches.filter((launch) => launch.success === isSuccess);
  const launchYears = Launches.map((launch) => launch.date_utc.slice(0, 4));

  // Count the successful launches for each year
  const launchYearCounts: { [year: string]: number } = {};
  launchYears.forEach((year) => {
    if (launchYearCounts[year]) {
      launchYearCounts[year]++;
    } else {
      launchYearCounts[year] = 1;
    }
  });

  // Prepare data for the Bar chart
  const data = {
    labels: Object.keys(launchYearCounts),
    datasets: [
      {
        label: 'Successful Launches',
        data: Object.values(launchYearCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
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

  return (
    <div>
      <h2>{isSuccess ? 'Successful launches by year' : 'failed launches by year'}</h2>
      <Bar data={data} options={options} />
    </div>
  );
}