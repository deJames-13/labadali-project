import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import HistoryItem from "../../components/HistoryItem";
import { useStateContext } from "../../contexts/ContextProvider";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("pending");

  const { user } = useStateContext();
  const statuses = ["pending", "ongoing", "finished", "delivered", "cancelled"];

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
    <div>
      <div className="flex flex-col w-full py-6 ">
        <div className="flex space-x-3">
          <h1 className="text-2xl font-bold tracking-wide">Booking History</h1>
          {loading && <span className="loading loading-dots loading-lg"></span>}
        </div>
        <p className="text-gray-600 font-bold">
          Check the status of the recent order, manage returns, and send
          feedback.
        </p>
      </div>
      <div className="flex space-x-3 items-center justify-end w-full">
        {statuses.map((s) => {
          return (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`btn btn-xs uppercase ${
                status === s ? "btn-primary" : "btn-ghost"
              } `}
            >
              {s}
            </button>
          );
        })}
      </div>
      <div className="divider"></div>

      <div className="flex flex-col-reverse">
        {bookings.length > 0 ? (
          bookings.map((booking) => {
            return (
              <div key={booking.id} className="py-3">
                <HistoryItem booking={booking} setBooking={setBookings} />
              </div>
            );
          })
        ) : (
          <h1 className=" font-medium ">No bookings found.</h1>
        )}
      </div>
    </div>
  );
}
