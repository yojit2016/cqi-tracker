import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
} from 'chart.js';
import { getDesignTokens } from '../../utils/chartHelpers';
import { useTheme } from '../../hooks/useTheme';

ChartJS.register(ArcElement, BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const DistributionChart = ({ type = 'donut', data, className = '' }) => {
  const { theme } = useTheme();
  const tokens = getDesignTokens();

  if (type === 'donut') {
    // Doughnut chart showing status distribution
    const counts = data || {
      pending: 2,
      'in-progress': 4,
      'under-review': 1,
      resolved: 3,
      delayed: 2,
    };

    const chartData = {
      labels: ['Pending', 'In Progress', 'Under Review', 'Resolved', 'Delayed'],
      datasets: [
        {
          data: [
            counts.pending || 0,
            counts['in-progress'] || 0,
            counts['under-review'] || 0,
            counts.resolved || 0,
            counts.delayed || 0,
          ],
          backgroundColor: [
            tokens.textSecondary + 'B0', // slate gray
            tokens.info,                  // blue
            tokens.warning,               // amber
            tokens.success,               // green
            tokens.error,                 // red
          ],
          borderColor: tokens.border,
          borderWidth: 1.5,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: tokens.textSecondary,
            font: {
              family: tokens.fontFamily,
              size: 11,
            },
          },
        },
        tooltip: {
          backgroundColor: theme === 'dark' ? '#1F293D' : '#FFFFFF',
          titleColor: tokens.textPrimary,
          bodyColor: tokens.textSecondary,
          borderColor: tokens.border,
          borderWidth: 1,
        },
      },
    };

    return (
      <div className={`relative h-60 w-full ${className}`}>
        <Doughnut key={theme} data={chartData} options={options} />
      </div>
    );
  } else {
    // Bar chart comparing department performance averages
    const deptAverages = data || {
      COMP: 84.6,
      IT: 83.9,
      EXTC: 81.2,
      MECH: 82.0,
    };

    const chartData = {
      labels: ['COMP', 'IT', 'EXTC', 'MECH'],
      datasets: [
        {
          label: 'Attainment Index (%)',
          data: [
            deptAverages.COMP || 0,
            deptAverages.IT || 0,
            deptAverages.EXTC || 0,
            deptAverages.MECH || 0,
          ],
          backgroundColor: [
            tokens.primary,   // crimson
            tokens.info,      // blue
            tokens.secondary, // gold
            tokens.success,   // green
          ],
          borderColor: tokens.border,
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: theme === 'dark' ? '#1F293D' : '#FFFFFF',
          titleColor: tokens.textPrimary,
          bodyColor: tokens.textSecondary,
          borderColor: tokens.border,
          borderWidth: 1,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: tokens.textSecondary,
            font: {
              family: tokens.fontFamily,
            },
          },
        },
        y: {
          min: 50,
          max: 100,
          grid: {
            color: tokens.border,
          },
          ticks: {
            color: tokens.textSecondary,
            font: {
              family: tokens.fontFamily,
            },
          },
        },
      },
    };

    return (
      <div className={`relative h-60 w-full ${className}`}>
        <Bar key={theme} data={chartData} options={options} />
      </div>
    );
  }
};

export default DistributionChart;
