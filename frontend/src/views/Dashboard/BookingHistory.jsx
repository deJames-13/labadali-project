import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import HistoryItem from "../../components/HistoryItem";
import { useStateContext } from "../../contexts/ContextProvider";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useStateContext();

  useEffect(() => {
    const getBookings = () => {
      setLoading(true);
      axiosClient
        .get("/bookings")
        .then(({ data }) => {
          const filtered = data.filter(
            (booking) => booking.customer_id === user.id
          );
          setLoading(false);
          setBookings(filtered);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getBookings();
  }, [user]);

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
      <div className="divider"></div>

      <div className="flex flex-col-reverse">
        {bookings.length > 0 ? (
          bookings.map((booking) => {
            return (
              <div key={booking.id} className="py-3">
                <HistoryItem
                  bookingNumber={booking.id.toString().padStart(9, "0")}
                  datePlaced={new Date(booking.created_at).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "2-digit" }
                  )}
                  totalAmount={parseFloat(booking.total_price)}
                  laundriesData={booking.laundries}
                />
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
