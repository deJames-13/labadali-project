/* eslint-disable no-unused-vars */
import { add, endOfYear, format, startOfYear, sub } from "date-fns";
import { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import Tab from "./Tab";
import YearlyRevenueTable from "./YearlyRevenueTable";
export default function YearlyRevenue() {
  const [date, setDate] = useState(new Date());

  const startDate = startOfYear(new Date());
  const endDate = endOfYear(new Date());
  const [dateValue, setDateValue] = useState({
    startDate: format(startDate, "yyyy-MM-dd"),
    endDate: format(endDate, "yyyy-MM-dd"),
  });
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings(dateValue);
    return () => {};
  }, [dateValue]);

  const getBookings = (dateValue) => {
    axiosClient
      .get(
        `/reports/yearlyRevenue?year=${format(
          new Date(dateValue.startDate),
          "yyyy"
        )}`
      )
      .then(({ data }) => {
        setBookings(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDateChange = (newDateRange) => {
    const startDate = startOfYear(new Date(newDateRange.startDate));
    const endDate = endOfYear(new Date(newDateRange.startDate));

    newDateRange.startDate = format(startDate, "yyyy-MM-dd");
    newDateRange.endDate = format(endDate, "yyyy-MM-dd");
    setDateValue(newDateRange);
    getBookings(newDateRange);
  };
  return (
    <>
      <Tab
        id={"annualbookings-report"}
        title="Annual Revenue"
        active={true}
        onClick={() => {}}
        dateValue={dateValue}
      >
        {/* TABLE */}
        <YearlyRevenueTable bookings={bookings} />
      </Tab>
    </>
  );
}
