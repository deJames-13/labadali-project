/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import axiosClient from "../../axios-client";
import BarChart from "./components/BarChart";
import DoughnutChart from "./components/DoughnutChart";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import ScatterChart from "./components/ScatterChart";
import StackBarChart from "./components/StackBarChart";

// function getCharts -
/*
    @var path - gets the api path for the chart
    @return - chartJS formatted object
    {
        labels: []
        dataSets: {
            label: 'Total Revenue',
            data: []
        }
    }
  */

export default function Charts() {
  const [dateValue, setDateValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [charts, setCharts] = useState({
    topLaundries: null,
    bookingStatus: null,
    monthlyBookings: null,
    monthlyRevenue: null,
    dailyRevenue: null,
    topCustomers: null,
    revenueByLaundryType: null,
  });

  const handleDatePickerValueChange = (newValue) => {
    setDateValue(newValue);
  };

  useEffect(() => {
    getChart("monthlyBookings");
    getChart("monthlyRevenue");
    getChart("topLaundries");
    getChart("bookingStatus");
  }, []);
  const getChart = (path) => {
    axiosClient
      .get(`/charts/${path}`)
      .then(({ data }) => {
        setCharts((prev) => ({ ...prev, [path]: data }));
      })
      .catch((err) => {
        console.error(`Error fetching data from ${path}: `, err);
      });
  };
  return (
    <>
      <Datepicker
        containerClassName="w-72"
        value={dateValue}
        theme={"cupcake"}
        inputClassName="input input-bordered w-72"
        popoverDirection={"down"}
        toggleClassName="invisible"
        onChange={handleDatePickerValueChange}
        showShortcuts={true}
        primaryColor={"white"}
      />
      {/** ---------------------- Different charts ------------------------- */}

      <div className="grid lg:grid-cols-2 mt-0 grid-cols-1 gap-6">
        <StackBarChart customData={charts.monthlyRevenue} />
        <BarChart customData={charts.monthlyBookings} />
      </div>

      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <DoughnutChart customData={charts.bookingStatus} />
        <PieChart customData={charts.topLaundries} />
      </div>

      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <ScatterChart />
        <LineChart />
      </div>
    </>
  );
}
