/* eslint-disable no-unused-vars */
import { add, format, sub } from "date-fns";
import { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import Tab from "./Tab";
export default function MonthlyRevenueByLaundry() {
  const e = new Date();
  const s = sub(e, { days: 31 });
  const [dateValue, setDateValue] = useState({
    startDate: format(s, "yyyy-MM-dd"),
    endDate: format(e, "yyyy-MM-dd"),
  });
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings(dateValue);
    return () => {};
  }, [dateValue]);

  const getBookings = (dateValue) => {
    axiosClient
      .get(
        `/reports/revenueByLaundryType?start_date=${dateValue.startDate}&end_date=${dateValue.endDate}`
      )
      .then(({ data }) => {
        setBookings(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDateChange = (newDateRange) => {
    const startDate = new Date(newDateRange.startDate);
    let endDate = new Date(newDateRange.endDate);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 31) {
      endDate = add(startDate, { days: 31 });
      newDateRange.endDate = format(endDate, "yyyy-MM-dd");
    }
    setDateValue(newDateRange);
    getBookings(newDateRange);
  };
  return (
    <>
      <Tab
        title="Month Revenue By Laundry"
        active={true}
        onClick={() => {}}
      ></Tab>
    </>
  );
}
