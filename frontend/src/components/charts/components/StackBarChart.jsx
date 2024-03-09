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
import { useEffect, useState } from "react";
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
import PreviewPrint from "../../PreviewPrint";
StackBarChart.propTypes = {
  customData: PropTypes.any,
};
function StackBarChart({ customData }) {
  const l = customData && customData.labels && customData.labels;
  const d = customData && customData.dataSets && [customData.dataSets];

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
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
            backgroundColor: "rgba(255, 99, 132, 1)",
          },
        ],
  };

  return (
    <>
      <TitleCard title={"Revenue"} topMargin="mt-2">
        <div className=" flex w-full h-full justify-center items-center">
          <Bar options={options} data={data} />
        </div>
      </TitleCard>
    </>
  );
}

export default StackBarChart;
