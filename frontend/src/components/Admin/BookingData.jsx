/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import BookingBarChart from "./BookingBarChart";
import BookingLineChart from "./BookingLineChart";
import BookingPieChart from "./BookingPieChart";

export default function BookingData() {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("all");
  const [max_page, setMaxPage] = useState(999);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const queries = [
      status && `_status=${status}`,
      max_page && `_max_page=${max_page}`,
      page && `page=${page}`,
    ];
    const query = queries.join("&");

    getBookings(query);
  }, [status, page, max_page]);

  const getBookings = (query) => {
    setLoading(true);
    axiosClient
      .get("/bookings" + `${"?" + query ?? ""}`)
      .then(({ data }) => {
        setLoading(false);
        setBookings(data.data ?? data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    bookings && (
      <div className="flex flex-col space-y-8 ">
        <BookingBarChart bookings={bookings} />
        <div className="container flex">
          <BookingPieChart bookings={bookings} />
          <BookingLineChart bookings={bookings} />
        </div>
      </div>
    )
  );
}
