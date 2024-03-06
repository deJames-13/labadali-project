/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import BookingConfirmationForm from "../../components/Booking/BookingConfirmationForm";
import BookingDetails from "../../components/Booking/BookingDetails";
import BookingItemList from "../../components/Booking/BookingItemList";
import BookingSelection from "../../components/Booking/BookingSelection";
import { useStateContext } from "../../contexts/ContextProvider";

export default function Booking() {
  const { user } = useStateContext();
  if (user && !user.customer) {
    return <Navigate to="/profile" />;
  }
  const [laundries, setLaundries] = useState([]);
  const [selected, setSelected] = useState([]);
  const [payload, setPayload] = useState({});
  const [steps, setSteps] = useState(1);
  const loc = useLocation();
  const state = loc.state ?? null;

  useEffect(() => {
    if (state && state.book_again) {
      setSelected(state.booking.laundries);
    }
    if (state && state.book_now) {
      setSelected([state.laundry]);
    }
    const getLaundries = () => {
      axiosClient
        .get("/laundries")
        .then(({ data }) => {
          setLaundries(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getLaundries();
  }, [user, state]);

  const onConfirm = (e) => {
    e.preventDefault();
    let total = 0;
    const data = {
      laundries: selected.reduce((acc, laundry) => {
        const itemId = laundry.id;
        const itemTotal = laundry.item_total;
        const quantity = laundry.quantity;
        total += parseInt(itemTotal);

        acc[itemId] = { item_total: itemTotal, quantity: quantity };

        return acc;
      }, {}),
      total_price: total,
    };
    setPayload(data);
    document.getElementById("bookingConfirmModal").showModal();
  };

  return (
    <>
      <div className="w-full brder flex flex-col space-y-6 justify-center">
        <h1 className="text-3xl text-center font-bold tracking-wider uppercase">
          Place Order
        </h1>

        <ul className="w-full py-6 steps steps-horizontal">
          <li className="step step-secondary after:!hidden">
            <span className="text-sm font-bold my-3">Your Laundries</span>
            <div className="step-icon">
              <i className="fas fa-shirt"></i>
            </div>
          </li>
          <li className={`step after:!hidden ${steps > 1 && "step-secondary"}`}>
            <span className="text-sm font-bold my-3">Pick Up Details</span>

            <div className="step-icon">
              <i className="fas fa-info"></i>
            </div>
          </li>
          <li className={`step after:!hidden ${steps > 2 && "step-secondary"}`}>
            <span className="text-sm font-bold my-3">Finish</span>

            <div className="step-icon">
              <i className="fas fa-check"></i>
            </div>
          </li>
        </ul>

        <div className="my-6 py-6 pb-12 bg-lightPink border border-cbrown rounded-lg flex flex-col space-y-6">
          <div className="flex flex-col space-y-3 ">
            {/* Actions */}
            {selected.length > 0 && steps > 0 && steps < 4 && (
              <div className="w-full flex items-center justify-end">
                {steps > 1 && (
                  <div className="px-0-3 text-right">
                    <button
                      onClick={(e) => {
                        setSteps(steps - 1);
                      }}
                      className="btn btn-primary text-cbrown font-bold px-6"
                    >
                      Back
                    </button>
                  </div>
                )}
                <div className="px-3 text-right">
                  <button
                    onClick={(e) => {
                      setSteps(steps + 1);
                      steps === 2 && onConfirm(e);
                    }}
                    className="btn btn-primary text-cbrown font-bold px-6"
                  >
                    {steps < 2 ? "Next" : "Finish"}
                  </button>
                </div>
              </div>
            )}

            {/* Selected Bookings */}
            {steps === 1 && <BookingSelection selected={selected} />}
            {steps > 1 && <BookingDetails selected={selected} />}
          </div>
        </div>
      </div>

      {/* MODALS */}
      {/* Show Laundries Modal */}
      <BookingItemList
        id="bookingItemList"
        laundries={laundries}
        selected={selected}
        setSelected={setSelected}
      />
      {/* Show Laundry Confirmation */}
      {
        <BookingConfirmationForm
          id="bookingConfirmModal"
          selected={selected}
          payload={payload}
          setStep={setSteps}
        />
      }
    </>
  );
}
