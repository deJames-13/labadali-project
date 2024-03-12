/* eslint-disable no-unused-vars */
import AmountStats from "./components/AmountStats";
import DashboardStats from "./components/DashboardStats";

import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import BarChart from "./components/BarChart";
import DashboardTopBar from "./components/DashboardTopBar";
import DoughnutChart from "./components/DoughnutChart";
import LineChart from "./components/LineChart";
import UserChannels from "./components/UserChannels";

function Dashboard() {
  const icons = {
    UserGroupIcon: <UserGroupIcon className="w-8 h-8" />,
    CreditCardIcon: <CreditCardIcon className="w-8 h-8" />,
    CircleStackIcon: <CircleStackIcon className="w-8 h-8" />,
    UsersIcon: <UsersIcon className="w-8 h-8" />,
  };
  const [charts, setCharts] = useState({
    weeklyRevenue: null,
    topCustomers: null,
    revenueByLaundryType: null,
    bookingStatus: null,
  });
  const [statsData, setStatsData] = useState([
    {
      title: "New Users",
      value: "34.7k",
      icon: <UserGroupIcon className="w-8 h-8" />,
      description: "↗︎ 2300 (22%)",
    },
    {
      title: "Total Sales",
      value: "$34,545",
      icon: <CreditCardIcon className="w-8 h-8" />,
      description: "Current month",
    },
    {
      title: "Pending Leads",
      value: "450",
      icon: <CircleStackIcon className="w-8 h-8" />,
      description: "50 in hot leads",
    },
    {
      title: "Active Users",
      value: "5.6k",
      icon: <UsersIcon className="w-8 h-8" />,
      description: "↙ 300 (18%)",
    },
  ]);

  useEffect(() => {
    getChart("weeklyRevenue");
    getChart("topCustomers");
    getChart("revenueByLaundryType");
    getChart("bookingStatus");
    getStats();
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
  const getStats = () => {
    axiosClient
      .get(`/charts/dashstats`)
      .then(({ data }) => {
        // change icons based on icons
        setStatsData(
          data.map((d) => {
            return { ...d, icon: icons[d.icon] };
          })
        );
      })
      .catch((err) => {
        console.error(`Error fetching data from stats: `, err);
      });
  };
  return (
    <>
      {/** ---------------------- Select Period Content ------------------------- */}
      <DashboardTopBar updateDashboardPeriod={() => {}} />

      {/** ---------------------- Different stats content 1 ------------------------- */}
      <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        {statsData.map((d, k) => {
          return <DashboardStats key={k} {...d} colorIndex={k} />;
        })}
      </div>

      {/** ---------------------- Different charts ------------------------- */}
      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <LineChart customData={charts.weeklyRevenue} />
        <BarChart customData={charts.revenueByLaundryType} />
      </div>

      {/** ---------------------- User source channels table  ------------------------- */}

      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <DoughnutChart customData={charts.bookingStatus} />
      </div>
      {/** ---------------------- Different stats content 2 ------------------------- */}

      <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
        <AmountStats />
        <UserChannels />
      </div>
    </>
  );
}

export default Dashboard;
