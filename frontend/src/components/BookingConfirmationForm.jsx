/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import Modal from "./Modal";
export default function BookingConfirmationForm({ id, selected, payload }) {
  const { user } = useStateContext();
  const navigate = useNavigate();
  const handleBooking = (e) => {
    e.preventDefault();
    if (payload) {
      axiosClient
        .post("/bookings", payload)
        .then(({ data }) => {})
        .catch((err) => {
          console.log(err);
        });
    }
    navigate("/history");
  };
  return (
    <Modal
      id={id}
      title={
        <>
          <i className="fas fa-check"></i>
          <h3 className="font-bold text-lg">Confirm Laundry Booking</h3>
        </>
      }
      main={
        <div className="flex flex-col space-y-3 ">
          <div className="grid grid-cols-2">
            <label htmlFor="name" className="font-medium">
              Name:
            </label>
            <span>
              {user.customer.first_name + " " + user.customer.last_name}
            </span>
            <label htmlFor="name" className="font-medium">
              Phone Number:
            </label>
            <span>{user.customer.phone_number}</span>
            <label htmlFor="name" className="font-medium">
              Adress:
            </label>
            <span>{user.customer.address}</span>
          </div>
          <div className="divider"></div>
          <div className="flex flex-col space-y-3 border border-cbrown p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-bold text-md">Total Cost</span>
              <span className="font-medium">P {payload.total_price}</span>
            </div>
            <div className="divider"></div>
            {payload.laundries &&
              selected.map((laundry) => {
                return (
                  <div
                    key={laundry.id}
                    className="flex justify-between items-center"
                  >
                    <span>
                      {laundry.title} x{payload.laundries[laundry.id].quantity}
                    </span>
                    <span>P {payload.laundries[laundry.id].item_total}</span>
                  </div>
                );
              })}
          </div>
        </div>
      }
      action={
        <>
          <form method="dialog">
            <button className="btn">Cancel</button>
          </form>

          <button
            onClick={handleBooking}
            tabIndex={1}
            className="btn btn-success"
          >
            Confirm
          </button>
        </>
      }
    />
  );
}

BookingConfirmationForm.propTypes = {
  id: PropTypes.string,
  selected: PropTypes.array,
  payload: PropTypes.object,
};
