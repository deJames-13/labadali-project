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
    const getBookings = () => {
      setLoading(true);
      axiosClient
        .get(
          "/bookings?user=" +
            user.id +
            "&_sort=created_at&_order=asc&_role=customer&_status=" +
            status
        )
        .then(({ data }) => {
          setLoading(false);
          setBookings(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getBookings();
  }, [user, status]);

  return (
    <div className="h-screen min-h-screen flex flex-col space-y-2">
      <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:justify-between lg:items-center">
        <div className="flex space-x-3 uppercase font-bold text-2xl  items-center">
          <i className="fas fa-book"></i>
          <h1>Bookings</h1>
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
      <div className="overflow-x-auto h-1/2 rounded-lg shadow-lg p-1 lg:p-6 bg-secondary bg-opacity-20">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead className="border-b-2 border-cbrown uppercase">
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
            <tr>
              <td>1</td>
              <td>Cy Ganderton</td>
              <td>1000</td>
              <td>pending</td>
              <td>12/16/2020</td>

              <th className="flex justify-center items-center space-x-3">
                <button className="btn btn-xs btn-gray-400">details</button>
                <button className="btn btn-primary btn-xs">
                  <i className="fas fa-pen"></i>
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
