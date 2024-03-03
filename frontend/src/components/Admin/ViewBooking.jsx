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
  console.log(data);
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
          <form method="dialog" className="flex flex-col  space-y-2">
            <h4 className="font-bold uppercase text-md">Set Status</h4>
            <div className="flex space-x-1 items-center justify-center">
              {/* pending */}
              <div className="form-control">
                <label className="label cursor-pointer flex-row space-x-3 items-center justify-center ">
                  <span className="label-text font-bold text-xs">Pending</span>
                  <input
                    onChange={(e) => setStatus(e.target.value)}
                    type="radio"
                    name="radio-status"
                    value="pending"
                    className="radio checked:bg-gray-500"
                    checked={status === "pending"}
                  />
                </label>
              </div>
              {/* ongoing */}
              <div className="form-control">
                <label className="label cursor-pointer flex-row space-x-3 items-center justify-center">
                  <span className="label-text font-bold text-xs">Ongoing</span>
                  <input
                    onChange={(e) => setStatus(e.target.value)}
                    type="radio"
                    name="radio-status"
                    value="ongoing"
                    className="radio checked:bg-yellow-500"
                    checked={status === "ongoing"}
                  />
                </label>
              </div>
              {/* finished */}
              <div className="form-control">
                <label className="label cursor-pointer flex-row space-x-3 items-center justify-center">
                  <span className="label-text font-bold text-xs">Finished</span>
                  <input
                    onChange={(e) => setStatus(e.target.value)}
                    type="radio"
                    name="radio-status"
                    value="finished"
                    className="radio checked:bg-green-500"
                    checked={status === "finished"}
                  />
                </label>
              </div>
              {/* delivered */}
              <div className="form-control">
                <label className="label cursor-pointer flex-row space-x-3 items-center justify-center">
                  <span className="label-text font-bold text-xs">
                    Delivered
                  </span>
                  <input
                    onChange={(e) => setStatus(e.target.value)}
                    type="radio"
                    name="radio-status"
                    value="delivered"
                    className="radio checked:bg-secondary"
                    checked={status === "delivered"}
                  />
                </label>
              </div>
              {/* cancelled */}
              <div className="form-control">
                <label className="label cursor-pointer flex-row space-x-3 items-center justify-center">
                  <span className="label-text font-bold text-xs">
                    Cancelled
                  </span>

                  <input
                    onChange={(e) => setStatus(e.target.value)}
                    type="radio"
                    name="radio-status"
                    value="cancelled"
                    className="radio checked:bg-red-500"
                    checked={status === "cancelled"}
                  />
                </label>
              </div>
            </div>
            <div className="flex space-x-2 items-end justify-end">
              <button onClick={handleClose} className="btn btn-sm ">
                Close
              </button>
              <button
                onClick={handleSave}
                tabIndex={1}
                className="btn btn-sm btn-success"
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
