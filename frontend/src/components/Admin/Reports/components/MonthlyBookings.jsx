/* eslint-disable no-unused-vars */
import { add, format, sub } from "date-fns";
import { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import MonthlyBookingsTable from "./MonthlyBookingsTable";
import Tab from "./Tab";

export default function MonthlyBookings() {
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
        `/reports/monthlyBookings?start_date=${dateValue.startDate}&end_date=${dateValue.endDate}`
      )
      .then(({ data }) => {
        setBookings(data);
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
  const onPrint = () => {};
  return (
    <Tab
      id={"monthlybookings-report"}
      title="Monthly Bookings"
      active={true}
      onClick={() => {}}
      onDateChange={handleDateChange}
      dateValue={dateValue}
    >
      {/* TABLE */}
      <MonthlyBookingsTable bookings={bookings} />
    </Tab>
  );
}
