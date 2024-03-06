/* eslint-disable no-unused-vars */
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";
import Modal from "../Modal";

ViewBooking.propTypes = {
  data: PropTypes.object.isRequired,
  newStatus: PropTypes.func.isRequired,
};

const statuses = ["pending", "ongoing", "finished", "delivered", "cancelled"];
export default function ViewBooking({ data, newStatus }) {
  const [status, setStatus] = useState("");
  const [booking, setBooking] = useState(data);
  useEffect(() => {
    setBooking(data);
    booking.status && setStatus(booking.status);
    return () => {};
  }, [booking, data]);
  const handleClose = (e) => {
    setStatus(booking.status);
  };
  const handleSave = (e) => {
    const data = {
      ...booking,
      status: status,
      laundries: booking.laundries.map((laundry) => ({
        ...laundry,
        laundry_id: laundry.id,
      })),
      updated_at: new Date().toISOString,
    };
    axiosClient
      .put("/bookings/" + booking.id, data)
      .then(({ data }) => {
        setBooking(data);
        newStatus(data.status);
      })
      .catch(({ err }) => {
        console.log(err.data);
      });
  };

  const onStatusSet = (e) => {
    e.preventDefault();
    setStatus(e.target.value);
  };

  return (
    <Modal
      id={"view-booking"}
      title={
        <>
          <h1 className="font-bold uppercase text-xl">View Booking</h1>
        </>
      }
      main={
        data && (
          <>
            <div className="flex flex-col space-y-3 ">
              <div className="grid grid-cols-2">
                <label htmlFor="name" className="font-medium">
                  Name:
                </label>
                <span>
                  {data.customer.first_name + " " + data.customer.last_name}
                </span>
                <label htmlFor="name" className="font-medium">
                  Phone Number:
                </label>
                <span>{data.customer.phone_number}</span>
                <label htmlFor="name" className="font-medium">
                  Adress:
                </label>
                <span>{data.customer.address}</span>
              </div>
              <div className="divider"></div>
              <div className="flex flex-col space-y-3 border border-cbrown p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-md">Total Cost</span>
                  <span className="font-medium">P {data.total_price}</span>
                </div>
                <div className="divider"></div>
                {data.laundries &&
                  data.laundries.map((laundry) => {
                    return (
                      <div
                        key={laundry.id}
                        className="flex justify-between items-center"
                      >
                        <span>
                          {laundry.title} x{laundry.quantity}
                        </span>
                        <span>P {laundry.item_total}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        )
      }
      action={
        <>
          <form method="dialog" className="w-full flex flex-col gap-3">
            <div>
              <h4 className="mx-2 font-extrabold uppercase">Set Status</h4>
              <div
                role="tablist"
                className="tabs tabs-boxed flex  bg-secondary bg-opacity-50"
              >
                {/* STATUSES */}
                {statuses.map((s, i) => {
                  return (
                    <div key={i} className="w-full form-control">
                      <button
                        value={s}
                        onClick={onStatusSet}
                        role="tab"
                        className={`tab font-bold uppercase ${
                          status === s ? "border border-cbrown" : ""
                        }`}
                      >
                        {s}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex space-x-2 items-end justify-end">
              <button onClick={handleClose} className="btn btn-sm ">
                Close
              </button>
              <button
                onClick={handleSave}
                tabIndex={1}
                className="btn btn-sm  btn-success"
              >
                Save
              </button>
            </div>
          </form>
        </>
      }
    />
  );
}
