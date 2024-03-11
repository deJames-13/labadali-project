import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import TitleCard from "../../Cards/TitleCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

import PropTypes from "prop-types";
LineChart.propTypes = {
  customData: PropTypes.any,
};
function LineChart({ customData }) {
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
            fill: true,
            label: "LabaDali",
            data: labels.map(() => {
              return Math.random() * 100 + 500;
            }),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
  };
  return (
    <TitleCard title={"Daily Revenue"}>
      <Line data={data} options={options} />
    </TitleCard>
  );
}

export default LineChart;
