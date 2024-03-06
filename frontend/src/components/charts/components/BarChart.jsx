/* eslint-disable no-unused-vars */
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import TitleCard from "../../Cards/TitleCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import PropTypes from "prop-types";

const barColors = {
  blue: "rgba(53, 162, 235, 1)",
  pink: "rgba(255, 99, 132, 1)",
};

export default function BarChart({ customData }) {
  const l = customData && customData.labels && customData.labels;
  const d = customData && customData.dataSets && [customData.dataSets];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const labels = l
    ? l
    : ["January", "February", "March", "April", "May", "June", "July"];

  const data = {
    labels,
    datasets: d
      ? d
      : [
          {
            label: "Store 1",
            data: labels.map(() => {
              return Math.random() * 1000 + 500;
            }),
            backgroundColor: barColors.pink,
          },
        ],
  };
  return (
    <TitleCard title={"Bookings"} topMargin="mt-2">
      <Bar options={options} data={data} />
    </TitleCard>
  );
}

BarChart.propTypes = {
  customData: PropTypes.any,
};
