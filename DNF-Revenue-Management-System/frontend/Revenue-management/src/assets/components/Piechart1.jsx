import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement
);

const pieChartData = {
  labels: ["Property Tax", "Garbage Tax", "Water Tax", "Vendor Tax", "Others"],
  datasets: [
    {
      label: "Time Spent",
      data: [1000, 2060, 3010, 1090, 1425],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      hoverOffset: 4,
    },
  ],
};

export default function Piechart() {
  const options = {
    plugins: {
      legend: {
        position: 'right', // Adjust the position as needed (top, bottom, left)
      },
    },
  };

  return <Pie options={options} data={pieChartData} />;
}
