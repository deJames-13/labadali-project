/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";

export default function LineChart({ data }) {
  const chartRef = useRef(null);
  const [key, setKey] = useState(2);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.chartInstance.destroy();
      }
    };
  }, [key]);
  const remountChart = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <div>
      <button onClick={remountChart}>Remount Chart</button>{" "}
      {/* Example button to trigger remount */}
      <Line key={key} ref={chartRef} data={data} />
    </div>
  );
}

LineChart.propTypes = {
  data: PropTypes.object,
};
