/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("pending");
  const { user } = useStateContext();

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = () => {
    setLoading(true);
    axiosClient
      .get("/bookings")
      .then(({ data }) => {
        console.log(data);
        setLoading(false);
        setBookings(data.data ?? data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" min-h-screen flex flex-col space-y-2">
      <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:justify-between lg:items-center">
        <div className="flex space-x-3 uppercase font-bold text-2xl  items-center">
          <i className="fas fa-book"></i>
          <h1>
            Bookings {loading && <span className="loading loading-dots"></span>}{" "}
          </h1>
        </div>

        <div className="lg:max-w-sm flex justify-end px-6 items-center space-x-3 border rounded-full border-cbrown">
          <input
            type="text"
            className="w-full input input-sm input-ghost input-md bg-transparent focus:border-none focus:outline-none"
          />
          <i className="fas fa-magnifying-glass "></i>
        </div>
      </div>

      <div className="flex space-x-3 font-bold items-center">
        <h2>Selected Item: </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto h-3/4 rounded-lg shadow-lg p-1 lg:p-6 bg-secondary bg-opacity-20">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead className="border-b-2 border-cbrown uppercase mb-4">
            <tr className="">
              <th>Id</th>
              <td>Customer</td>
              <td>Total</td>
              <td>Status</td>
              <td>Order Date</td>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookings &&
              bookings.length > 0 &&
              bookings.map((book, index) => {
                const date = new Date(book.created_at).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  }
                );
                const full_name =
                  book.customer &&
                  `${book.customer.first_name} ${book.customer.last_name}`;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="link hover:text-blue-900 link-hover">
                      {full_name}
                    </td>
                    <td>{book.total_price}</td>
                    <td>{book.status}</td>
                    <td>{date}</td>
                    <th className="flex justify-center items-center space-x-3">
                      <button className="btn btn-xs btn-gray-400">
                        details
                      </button>
                      <button className="btn btn-primary btn-xs">
                        <i className="fas fa-pen"></i>
                      </button>
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
