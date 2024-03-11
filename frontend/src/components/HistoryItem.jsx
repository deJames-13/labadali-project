/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import BookingItem from "./Booking/BookingItem";
import Feedback from "./Feedback";
import Modal from "./Modal";

export default function HistoryItem({ booking, setBooking, setStatus }) {
  const [loading, setLoading] = useState(false);
  const [showLaundries, setShowLaundries] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isChange, setIsChanged] = useState(false);
  const [isShowFeedback, setIsShowFeedback] = useState(false);
  const [laundriesData, setLaundriesData] = useState(booking.laundries);
  const navTo = useNavigate();
  const [totalAmount, setTotalAmount] = useState(
    parseFloat(booking.total_price)
  );

  useEffect(() => {
    isShowFeedback &&
      document.getElementById("create-feedback-modal").showModal();
  }, [isShowFeedback]);

  const bookingNumber = booking.id.toString().padStart(9, "0");
  const datePlaced = new Date(booking.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const handleCancel = (e) => {
    const data = {
      ...booking,
      status: "cancelled",
      laundries: laundriesData.map((laundry) => ({
        ...laundry,
        laundry_id: laundry.id,
      })),
    };
    axiosClient
      .put("/bookings/" + booking.id, data)
      .then(({ data }) => {
        setBooking(data);
        setStatus("cancelled");
      })
      .catch(({ err }) => {
        console.log(err.data);
      });
  };

  const handleEditSave = () => {
    let total = 0;
    booking.laundries.forEach((laundry) => {
      total += parseFloat(laundry.price) * laundry.quantity;
    });
    setTotalAmount(total);

    const data = {
      ...booking,
      total_price: total,
      laundries: booking.laundries.map((laundry) => ({
        ...laundry,
        laundry_id: laundry.id,
      })),
    };
    // console.log("Sending: ", data);
    setLoading(true);
    axiosClient
      .put("/bookings/" + booking.id, data)
      .then(({ data }) => {
        // console.log("Received: ", data);
        setLaundriesData(data.laundries);
        setIsEdit(false);
        setIsChanged(false);
        setLoading(false);
      })
      .catch(({ err }) => {
        console.log(err.data);
      });
  };

  const handleShowLaundries = () => {
    setShowLaundries(!showLaundries);
    setIsEdit(false);
    setIsChanged(false);
  };

  const onBookAgain = (e) => {
    e.preventDefault();
    navTo("/booking", { state: { book_again: true, booking } });
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 w-screen h-screen z-99 bg-gray-700 bg-opacity-50 grid place-items-center">
          <div className="loading loading-lg"></div>
        </div>
      )}
      {/* Order Info Card */}
      <div className="bg-secondary bg-opacity-20  p-3 rounded-lg border border-cbrown hover:bg-opacity-30 ease-in-out transition-all">
        <div className="w-full flex flex-col space-y-6  items-center md:space-y-0 md:flex-row md:justify-between">
          <div className="flex space-x-6 text-center">
            <div className="flex flex-col space-y-1">
              <h2 className="font-bold ">Booking No.</h2>
              <p className="font-medium text-sm">{bookingNumber}</p>
            </div>

            <div className="flex flex-col space-y-1">
              <h2 className="font-bold ">Date Placed</h2>
              <p className="font-medium text-sm">{datePlaced}</p>
            </div>

            <div className="flex flex-col space-y-1">
              <h2 className="font-bold ">Total </h2>
              <p className="font-medium text-sm">₱ {totalAmount}</p>
            </div>
          </div>
          <div className="flex flex-row space-x-3 ">
            {booking.status === "pending" && showLaundries && (
              <button
                onClick={() => {
                  setIsEdit(!isEdit);
                  setIsChanged(!isEdit);
                }}
                className="btn btn-sm btn-primary px-6"
              >
                {isEdit ? "Cancel" : "Edit"}
              </button>
            )}

            {booking.status === "pending" && isChange && (
              <button
                onClick={handleEditSave}
                className="btn btn-sm btn-success px-6"
              >
                Save
              </button>
            )}
            <button
              onClick={handleShowLaundries}
              className="btn btn-sm btn-primary px-3"
            >
              View Laudries
            </button>
            {booking.status === "delivered" && (
              <button
                onClick={(e) => setIsShowFeedback(true)}
                className="btn btn-sm btn-primary px-3"
              >
                Send Feedback
              </button>
            )}
            {(booking.status === "cancelled" ||
              booking.status === "delivered") && (
              <button
                onClick={onBookAgain}
                className="btn btn-sm btn-secondary px-3"
              >
                Book Again
              </button>
            )}

            {
              /* Cancel Confirm Modal*/
              booking.status === "pending" && (
                <>
                  <button
                    onClick={() => {
                      document
                        .getElementById("cancelModal" + booking.id)
                        .showModal();
                    }}
                    className="btn btn-sm btn-error px-3"
                  >
                    Cancel
                  </button>
                  <Modal
                    id={"cancelModal" + booking.id}
                    title={
                      <h1 className="w-full text-left text-lg font-bold">
                        Cancel Booking No.: {bookingNumber}
                      </h1>
                    }
                    main={
                      <>
                        <h2 className="font-bold">
                          Are you sure you want to cancel this booking?
                        </h2>
                      </>
                    }
                    action={
                      <form method="dialog">
                        <button className="btn">Close</button>
                        <button
                          onClick={handleCancel}
                          className="btn btn-error"
                        >
                          Confirm
                        </button>
                      </form>
                    }
                    height={300}
                  />
                </>
              )
            }
          </div>
        </div>
        {showLaundries && (
          <div className="">
            <div className="w-full text-right"></div>
            <div className="flex flex-col-reverse space-y-3">
              {laundriesData &&
                laundriesData.length > 0 &&
                laundriesData.map((laundry) => {
                  return (
                    <BookingItem
                      key={laundry.id}
                      id={laundry.id}
                      item={laundry}
                      qty={laundry.quantity}
                      selected={booking.laundries}
                      isHistory={true && !isEdit}
                      setIsChanged={setIsChanged}
                    />
                  );
                })}
            </div>
          </div>
        )}
      </div>
      {isShowFeedback && (
        <Feedback
          id="create-feedback-modal"
          bookingId={booking.id}
          toggle={setIsShowFeedback}
        />
      )}
    </>
  );
}

// ...

HistoryItem.propTypes = {
  setBooking: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  booking: PropTypes.shape({
    created_at: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    total_price: PropTypes.string.isRequired,
    laundries: PropTypes.array.isRequired,
  }).isRequired,
};

// ...
