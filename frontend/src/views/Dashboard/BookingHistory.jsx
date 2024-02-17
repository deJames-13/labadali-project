import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import HistoryItem from "../../components/HistoryItem";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = () => {
    setLoading(true);
    axiosClient
      .get("/bookings")
      .then(({ data }) => {
        setLoading(false);
        setBookings(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

      <div className=" flex flex-col-reverse space-y-6">
        {bookings.length > 0 &&
          bookings.map((booking) => {
            return (
              <HistoryItem
                key={booking.id}
                bookingNumber={booking.id.toString().padStart(9, "0")}
                datePlaced={new Date(booking.created_at).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "long", day: "2-digit" }
                )}
                totalAmount={parseFloat(booking.total_price)}
                laundriesData={booking.laundries}
              />
            );
          })}
      </div>
    </div>
  );
}
