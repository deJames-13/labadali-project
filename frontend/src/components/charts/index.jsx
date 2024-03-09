/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import axiosClient from "../../axios-client";
import PreviewPrint from "../PreviewPrint";
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

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
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
      <div className="w-full text-right">
        <button
          onClick={(e) =>
            document.getElementById("printable-preview-rb").showModal()
          }
          className="btn btn-ghost btn-sm"
        >
          Print Preview
        </button>
      </div>
      <div className="grid lg:grid-cols-2 mt-0 grid-cols-1 gap-6">
        <StackBarChart customData={charts.monthlyRevenue} />
        <BarChart customData={charts.monthlyBookings} />

        {/** ---------------------- Print Preview ------------------------- */}

        <PreviewPrint
          id="printable-preview-rb"
          title={"Revenue and Bookings"}
          toPrint={
            <>
              <div className="flex flex-col space-y-3 w-full h-full justify-center items-center">
                <div className="w-[600px]">
                  <StackBarChart customData={charts.monthlyRevenue} />
                </div>
                <div className="w-[600px]">
                  <BarChart customData={charts.monthlyBookings} />
                </div>
              </div>
            </>
          }
        />
      </div>

      <div className="w-full text-right">
        <button
          onClick={(e) =>
            document.getElementById("printable-preview-sl").showModal()
          }
          className="btn btn-ghost btn-sm"
        >
          Print Preview
        </button>
      </div>
      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <DoughnutChart customData={charts.bookingStatus} />
        <PieChart customData={charts.topLaundries} />
        {/** ---------------------- Print Preview ------------------------- */}

        <PreviewPrint
          id="printable-preview-sl"
          title={"Top Laundries and Booking Status"}
          toPrint={
            <>
              <div className="flex flex-col space-y-12 px-8 w-full h-full justify-center items-center">
                <DoughnutChart customData={charts.bookingStatus} />
                <div className="divider py-[50px]"></div>
                <PieChart customData={charts.topLaundries} />
              </div>
            </>
          }
        />
      </div>

      <div className="w-full text-right">
        <button
          onClick={(e) =>
            document.getElementById("printable-preview-scli").showModal()
          }
          className="btn btn-ghost btn-sm"
        >
          Print Preview
        </button>
      </div>
      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <ScatterChart />
        <LineChart />
        <PreviewPrint
          id="printable-preview-scli"
          title={"Revenue and Bookings"}
          toPrint={
            <>
              <div className="flex flex-col space-y-3 w-full h-full justify-center items-center">
                <div className="w-[600px]">
                  <ScatterChart />
                </div>
                <div className="w-[600px]">
                  <LineChart />
                </div>
              </div>
            </>
          }
        />
      </div>
    </>
  );
}
