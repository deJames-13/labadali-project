/* eslint-disable no-unused-vars */
import { Chart as ChartJS } from "chart.js/auto";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

const BookingPieChart = ({ bookings }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const laundryCounts = bookings.reduce((counts, booking) => {
      booking.laundries.forEach((laundry) => {
        counts[laundry.title] = (counts[laundry.title] || 0) + 1;
      });
      return counts;
    }, {});

    const data = {
      labels: Object.keys(laundryCounts),
      datasets: [
        {
          label: "Popularity",
          data: Object.values(laundryCounts),
          backgroundColor: Object.keys(laundryCounts).map(
            () => "#" + Math.floor(Math.random() * 16777215).toString(16)
          ),
        },
      ],
    };

    const options = {
      responsive: true,
      title: {
        display: true,
        text: "Popular Laundries",
      },
      legend: {
        display: true,
        position: "left",
      },
      tooltips: {
        enabled: true,
      },
    };

    const ctx = document.getElementById("myPieChart").getContext("2d");
    chartRef.current = new ChartJS(ctx, {
      type: "pie",
      data: data,
      options: options,
    });
  }, [bookings]);

  return (
    <div className="w-1/2">
      <canvas id="myPieChart"></canvas>
    </div>
  );
};

BookingPieChart.propTypes = {
  bookings: PropTypes.array.isRequired,
};

export default BookingPieChart;
