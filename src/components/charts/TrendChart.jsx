import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getDesignTokens } from '../../utils/chartHelpers';
import { useTheme } from '../../hooks/useTheme';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TrendChart = ({ data, department = 'ALL' }) => {
  const { theme } = useTheme();
  const tokens = getDesignTokens();

  // If data is not provided, load default mock sem scores
  const labels = data ? data.map(d => d.semester) : ['Sem I', 'Sem II', 'Sem III', 'Sem IV', 'Sem V', 'Sem VI'];

  const getDataset = () => {
    const rawData = data || [
      { semester: 'Sem I', COMP: 78.4, IT: 76.2, EXTC: 72.8, MECH: 74.0 },
      { semester: 'Sem II', COMP: 80.2, IT: 78.5, EXTC: 74.1, MECH: 75.2 },
      { semester: 'Sem III', COMP: 81.6, IT: 80.0, EXTC: 76.5, MECH: 77.8 },
      { semester: 'Sem IV', COMP: 82.2, IT: 81.3, EXTC: 78.0, MECH: 79.1 },
      { semester: 'Sem V', COMP: 83.5, IT: 82.8, EXTC: 79.4, MECH: 80.5 },
      { semester: 'Sem VI', COMP: 84.6, IT: 83.9, EXTC: 81.2, MECH: 82.0 },
    ];

    if (department === 'ALL') {
      return [
        {
          label: 'Computer Eng. (COMP)',
          data: rawData.map(d => d.COMP),
          borderColor: tokens.primary,
          backgroundColor: tokens.primary + '20',
          tension: 0.3,
        },
        {
          label: 'Information Tech (IT)',
          data: rawData.map(d => d.IT),
          borderColor: tokens.info,
          backgroundColor: tokens.info + '20',
          tension: 0.3,
        },
        {
          label: 'Electronics & Tel (EXTC)',
          data: rawData.map(d => d.EXTC),
          borderColor: tokens.secondary,
          backgroundColor: tokens.secondary + '20',
          tension: 0.3,
        },
        {
          label: 'Mechanical Eng (MECH)',
          data: rawData.map(d => d.MECH),
          borderColor: tokens.success,
          backgroundColor: tokens.success + '20',
          tension: 0.3,
        }
      ];
    } else {
      const colors = {
        COMP: tokens.primary,
        IT: tokens.info,
        EXTC: tokens.secondary,
        MECH: tokens.success,
      };
      const names = {
        COMP: 'Computer Eng. (COMP)',
        IT: 'Information Tech (IT)',
        EXTC: 'Electronics & Tel (EXTC)',
        MECH: 'Mechanical Eng (MECH)',
      };
      return [
        {
          label: names[department],
          data: rawData.map(d => d[department]),
          borderColor: colors[department] || tokens.primary,
          backgroundColor: (colors[department] || tokens.primary) + '20',
          tension: 0.3,
        }
      ];
    }
  };

  const chartData = {
    labels,
    datasets: getDataset(),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: tokens.textSecondary,
          font: {
            family: tokens.fontFamily,
            size: 11,
          },
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: theme === 'dark' ? '#1F293D' : '#FFFFFF',
        titleColor: tokens.textPrimary,
        bodyColor: tokens.textSecondary,
        borderColor: tokens.border,
        borderWidth: 1,
        titleFont: {
          family: tokens.fontFamily,
        },
        bodyFont: {
          family: tokens.fontFamily,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: tokens.border,
        },
        ticks: {
          color: tokens.textSecondary,
          font: {
            family: tokens.fontFamily,
            size: 10,
          },
        },
      },
      y: {
        min: 60,
        max: 100,
        grid: {
          color: tokens.border,
        },
        ticks: {
          color: tokens.textSecondary,
          font: {
            family: tokens.fontFamily,
            size: 10,
          },
        },
      },
    },
  };

  // Re-render chart on theme changes using key swap
  return (
    <div className="relative w-full h-full min-h-[260px]">
      <Line key={theme + department} data={chartData} options={options} />
    </div>
  );
};

export default TrendChart;
