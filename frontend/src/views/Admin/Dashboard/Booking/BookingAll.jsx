/* eslint-disable no-unused-vars */
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import ViewBooking from "../../../../components/Admin/ViewBooking";
import BookingDetails from "../../../../components/BookingDetails";
import Pagination from "../../../../components/Pagination";
import { useStateContext } from "../../../../contexts/ContextProvider";

export default function BookingAll() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState({});
  const [search, setSearch] = useState(null);
  const [links, setLinks] = useState(null);
  const [page, setPage] = useState(1);
  const { user } = useStateContext();
  const statuses = [
    "all",
    "pending",
    "ongoing",
    "finished",
    "delivered",
    "cancelled",
  ];

  useEffect(() => {
    const queries = [
      page && `page=${page}`,
      search && `_search=${search}`,
      status && `_status=${status}`,
    ];
    const query = queries.join("&");

    getBookings(query);
  }, [status, search, page]);

  const getBookings = (query) => {
    setLoading(true);
    axiosClient
      .get("/bookings" + `${"?" + query ?? ""}`)
      .then(({ data }) => {
        setLoading(false);
        setBookings(data.data ?? data);
        setLinks(data.links ?? null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSelect = (id) => {
    setSelected(bookings.filter((book) => book.id == id)[0]);
  };

  const viewBooking = () => {
    document.getElementById("view-booking").showModal();
  };
  const onSearch = debounce((e) => {
    e.preventDefault();
    const q = e.target.value;
    setSearch(q);
  }, 500);
  return (
    <>
      <div className=" min-h-screen flex flex-col space-y-2">
        <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:justify-between lg:items-center">
          <div className="flex space-x-3 uppercase font-bold text-2xl  items-center">
            <i className="fas fa-book"></i>
            <h1>
              Bookings{" "}
              {loading && <span className="loading loading-dots"></span>}{" "}
            </h1>
          </div>

          <div className="lg:max-w-sm flex justify-end px-6 items-center space-x-3 border rounded-full border-cbrown">
            <input
              onChange={onSearch}
              type="text"
              className="w-full input input-sm input-ghost input-md bg-transparent focus:border-none focus:outline-none"
            />
            <i className="fas fa-magnifying-glass "></i>
          </div>
        </div>

        <div className="py-4 flex space-x-3 font-bold items-center justify-between">
          <h2>Selected Item: {selected.id ?? "_"}</h2>

          <Pagination setPage={setPage} {...links} />
        </div>
        <div className="flex space-x-3 font-bold items-center justify-between"></div>

        {/* Table */}
        <div role="tablist" className="tabs tabs-lifted w-1/2">
          {/* map statuses */}
          {statuses.map((s, i) => (
            <a
              role="tab"
              key={i}
              onClick={(e) => setStatus(s)}
              className={`tab ${
                status == s
                  ? "tab-active  [--tab-bg:pink] bg-opacity-40"
                  : "btn-gray-400"
              }`}
            >
              {s}
            </a>
          ))}
        </div>
        <div className="overflow-x-auto my-[0!important] h-3/4 rounded-tr-lg  rounded-b-lg shadow-lg px-1 lg:p-6 mx-0 bg-pink-400 bg-opacity-40">
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
                    <tr
                      key={index}
                      onClick={(e) => handleSelect(book.id)}
                      onDoubleClick={viewBooking}
                    >
                      <td>{book.id}</td>
                      <td className="link hover:text-blue-900 link-hover">
                        {full_name}
                      </td>
                      <td>{book.total_price}</td>
                      <td>{book.status}</td>
                      <td>{date}</td>
                      <th className="flex justify-center items-center space-x-3">
                        <button
                          onClick={selected.id && viewBooking}
                          className="btn btn-xs btn-gray-400"
                        >
                          details
                        </button>
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {!bookings.length && !loading > 0 && (
            <div className="py-6 w-full space-x-4 flex justify-center items-center">
              <button
                id="addfirst"
                className="aspect-square btn btn-sm btn-primary rounded-lg"
              >
                <i className="fas fa-plus"></i>
              </button>
              <label htmlFor="addfirst" className="label">
                No bookings found. Click + to create new booking.
              </label>
            </div>
          )}
        </div>

        {
          /*MODALS*/
          <>
            {selected.id && (
              <ViewBooking data={selected} newStatus={setStatus} />
            )}
          </>
        }
      </div>
    </>
  );
}
