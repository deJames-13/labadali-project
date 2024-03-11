import MonthRevenue from "./components/MonthRevenue";
import MonthlyBookings from "./components/MonthlyBookings";
import MonthlyRevenueByLaundry from "./components/MonthlyRevenueByLaundry";
export default function Reports() {
  return (
    <div>
      <h1 className="font-bold uppercase text-3xl">Reports</h1>
      <div className="divider"></div>
      <div role="tablist" className="tabs tabs-lifted w-full">
        <MonthlyBookings />
        <MonthRevenue />
        <MonthlyRevenueByLaundry />
      </div>
    </div>
  );
}
