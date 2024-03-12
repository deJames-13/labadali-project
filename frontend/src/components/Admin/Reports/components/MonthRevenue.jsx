/* eslint-disable no-unused-vars */
import { add, format, sub } from "date-fns";
import { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import MonthlyBookingsTable from "./MonthlyBookingsTable";
import Tab from "./Tab";
export default function MonthRevenue() {
  const [date, setDate] = useState(new Date());

  return <Tab title="Monthly Revenue" active={true} onClick={() => {}}></Tab>;
}
