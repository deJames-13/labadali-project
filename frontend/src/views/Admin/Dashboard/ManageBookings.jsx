/* eslint-disable no-unused-vars */
import { useLocation } from "react-router-dom";
import BookingAll from "../../../components/Admin/Booking/BookingAll";
import Booking from "../../Dashboard/Booking";

export default function ManageBookings() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = query.get("page");
  return <>{page === "addBooking" ? <Booking /> : <BookingAll />}</>;
}
