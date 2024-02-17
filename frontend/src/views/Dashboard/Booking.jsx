/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import BookingConfirmationForm from "../../components/BookingConfirmationForm";
import BookingItem from "../../components/BookingItem";
import BookingItemList from "../../components/BookingItemList";

export default function Booking() {
  const [laundries, setLaundries] = useState([]);
  const [selected, setSelected] = useState([]);
  const [payload, setPayload] = useState({});

  useEffect(() => {
    getLaundries();
  }, []);

  const onConfirm = (e) => {
    e.preventDefault();
    let total = 0;
    const data = {
      laundries: selected.reduce((acc, laundry) => {
        const itemId = laundry.id;
        const itemTotal = laundry.price;
        const quantity = laundry.qty;
        total += parseInt(itemTotal);

        acc[itemId] = { item_total: itemTotal, quantity: quantity, id: itemId };

        return acc;
      }, {}),
      total_price: total,
    };
    setPayload(data);
    document.getElementById("bookingConfirmModal").showModal();
  };

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
          <li className="step step-secondary after:!hidden">
            <span className="text-sm font-bold my-3">Pick Up Details</span>

            <div className="step-icon">
              <i className="fas fa-info"></i>
            </div>
          </li>
          <li className="step step-secondary after:!hidden">
            <span className="text-sm font-bold my-3">Finish</span>

            <div className="step-icon">
              <i className="fas fa-check"></i>
            </div>
          </li>
        </ul>

        <div className="my-6 py-6 pb-12 bg-lightPink border border-cbrown rounded-lg flex flex-col space-y-6">
          <div className="p-6 flex flex-col space-y-3">
            <h2 className="text-xl font-bold uppercase">Branch</h2>
            <select
              name="branch"
              id="branch"
              className="select select-cbrown w-full rounded-sm"
            >
              <option disabled>Pick your location</option>
            </select>
          </div>

          <div className="flex flex-col space-y-3 ">
            {/* Actions */}
            {selected.length > 0 && (
              <div className="w-full px-8 p-3 text-right">
                <button
                  onClick={onConfirm}
                  className="btn btn-primary text-cbrown font-bold px-6"
                >
                  Next
                </button>
              </div>
            )}

            <div className="flex justify-between items-center w-full text-center bg-secondary">
              <span className="w-full text-lg font-bold uppercase">
                Services
              </span>
              <span className="hidden lg:block w-full text-lg font-bold uppercase">
                Qty
              </span>
              <span className="hidden lg:block w-full text-lg font-bold uppercase">
                Price
              </span>
            </div>

            {/* Lists of Laundries */}
            <div className="transition-all flex flex-col space-y-3">
              {selected.length > 0 &&
                selected.map((laundry) => {
                  return (
                    <BookingItem
                      key={laundry.id}
                      id={laundry.id}
                      title={laundry.title}
                      price={parseFloat(laundry.price)}
                      description={laundry.description}
                      selected={selected}
                    />
                  );
                })}
            </div>

            <div className="px-12 py-8 w-full flex flex-col justify-center items-center gap-3 lg:flex-row">
              <button
                onClick={() =>
                  document.getElementById("bookingItemList").showModal()
                }
                className="btn btn-outline btn-primary rounded-lg text-xl"
              >
                <i className="fas fa-plus"></i>
              </button>

              <span className="text-md font-medium">
                <span>{selected.length === 0 && "No laundries found."}</span>{" "}
                Click to select laundry items for booking.
              </span>
            </div>
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
      {Object.keys(payload).length > 0 && (
        <BookingConfirmationForm
          id="bookingConfirmModal"
          selected={selected}
          payload={payload}
        />
      )}
    </>
  );
}
