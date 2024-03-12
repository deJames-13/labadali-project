/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import MonthRevenue from "./components/MonthRevenue";
import MonthlyBookings from "./components/MonthlyBookings";
import MonthlyRevenueByLaundry from "./components/MonthlyRevenueByLaundry";
import YearlyRevenue from "./components/YearlyRevenue";
export default function Reports() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold uppercase text-3xl">Reports</h1>
        <Link
          to={"/admin/manage/reports?page=charts"}
          className="font-bold uppercase btn rounded-sm btn-ghost"
        >
          View Charts
        </Link>
      </div>

      <div className="divider"></div>
      <div role="tablist" className="tabs tabs-lifted w-full ">
        <MonthlyBookings />
        {/* <MonthlyRevenueByLaundry /> */}
        <YearlyRevenue />
        {/* <MonthRevenue /> */}
      </div>
    </div>
  );
}
