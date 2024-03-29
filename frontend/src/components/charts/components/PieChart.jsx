/* eslint-disable no-unused-vars */
import {
  ArcElement,
  Chart as ChartJS,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import TitleCard from "../../Cards/TitleCard";
import Subtitle from "../../Typography/Subtitle";

ChartJS.register(ArcElement, Tooltip, Legend, Tooltip, Filler, Legend);

import PropTypes from "prop-types";
PieChart.propTypes = {
  customData: PropTypes.any,
};
function PieChart({ customData }) {
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
    : [
        "India",
        "Middle East",
        "Europe",
        "US",
        "Latin America",
        "Asia(non-india)",
      ];

  const data = {
    labels,
    datasets: d
      ? d
      : [
          {
            label: "# of Orders",
            data: [122, 219, 30, 51, 82, 13],
            backgroundColor: [
              "rgba(255, 99, 255, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(255, 206, 255, 0.8)",
              "rgba(75, 192, 255, 0.8)",
              "rgba(153, 102, 255, 0.8)",
              "rgba(255, 159, 255, 0.8)",
            ],
            borderColor: [
              "rgba(255, 99, 255, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 255, 1)",
              "rgba(75, 192, 255, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
  };
  return (
    <TitleCard title={"Top Laundries"}>
      <div className="w-full flex justify-center items-center">
        <Pie options={options} data={data} />
      </div>
    </TitleCard>
  );
}

export default PieChart;
