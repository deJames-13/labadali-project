/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
export default function BookingDetails({ selected }) {
  const { user } = useStateContext();
  const dateNow = new Date().toISOString().split("T")[0];

  const [details, setDetails] = useState({
    name: user.customer.first_name + " " + user.customer.last_name,
    user_address: user.customer.address,
    phone_number: user.customer.phone_number,
    email: user.email,
    preferred_address: user.customer.address,
    pick_up_date: dateNow,
    pick_up_time: "09:00",
  });
  const [editPersonal, setEditPersonal] = useState(false);

  return (
    <div className="py-3 px-6 flex flex-col space-y-6 pb-16">
      <h1 className="font-bold text-xl uppercase">Booking Details</h1>
      <div className="divider"></div>
      <div className="w-full flex justify-between items-center">
        <h2 className="font-bold text-lg">Personal Information</h2>
        <button
          onClick={(e) => setEditPersonal(!editPersonal)}
          className="fas fa-pen btn btn-sm bg-primary aspect-square hover:border hover:border-cbrown"
        ></button>
      </div>
      <div className="lg:px-16 grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-3">
        {/* Name */}
        <span className="font-medium">Name: </span>
        {!editPersonal && <p className="lg:col-span-2">{details.name}</p>}
        {editPersonal && (
          <input
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            type="text"
            className="lg:col-span-2 input input-primary input-bordered input-sm rounded-lg "
            value={details.name}
          />
        )}

        {/* Address */}
        <span className="font-medium">Home Address: </span>
        {!editPersonal && (
          <p className="lg:col-span-2">{details.user_address}</p>
        )}
        {editPersonal && (
          <input
            onChange={(e) =>
              setDetails({ ...details, address: e.target.value })
            }
            type="text"
            className="lg:col-span-2 input input-primary input-bordered input-sm rounded-lg "
            value={details.user_address}
          />
        )}

        {/* Contact Number */}
        <span className="font-medium">Email: </span>
        {!editPersonal && (
          <p className="lg:col-span-2">{details.phone_number}</p>
        )}
        {editPersonal && (
          <input
            onChange={(e) =>
              setDetails({ ...details, phone_number: e.target.value })
            }
            type="text"
            className="lg:col-span-2 input input-primary input-bordered input-sm rounded-lg "
            value={details.phone_number}
          />
        )}

        {/* Email */}
        <span className="font-medium">Contact Info: </span>
        {!editPersonal && <p className="lg:col-span-2">{details.email}</p>}
        {editPersonal && (
          <input
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            type="email"
            className="lg:col-span-2 input input-primary input-bordered input-sm rounded-lg "
            value={details.email}
          />
        )}
      </div>
      <div className="divider"></div>
      <h2 className="font-bold text-lg">Pick Up Details</h2>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {/* Set pick up date */}
        <div className="px-4 flex flex-col space-y-2">
          <span className="font-medium text-sm">Schedule a pick up date:</span>
          <input
            onChange={(e) => {
              setDetails({
                ...details,
                pick_up_date:
                  e.target.value < dateNow ? dateNow : e.target.value,
              });
            }}
            type="date"
            name="pickUpDate"
            id="pickUpDate"
            className="w-full max-w-xs input input-sm"
            value={details.pick_up_date}
          />
        </div>
        {/* Set pick up time */}
        <div className="px-4 flex flex-col space-y-2">
          <span className="font-medium text-sm">Preferred pick up time:</span>
          <input
            onChange={(e) => {
              setDetails({
                ...details,
                pick_up_time:
                  e.target.value > "09:00" && e.target.value < "17:00"
                    ? e.target.value
                    : "17:00",
              });
            }}
            type="time"
            name="pickUpTime"
            id="pickUpTime"
            value={details.pick_up_time}
            className="w-full max-w-xs input input-sm"
          />
          <p className="text-xs font-light text-gray-800 italic">
            * Pick up time is only available for 9:00 AM to 5:00PM
          </p>
        </div>
      </div>
      {/* Set pickup location */}
      <div className="px-4 flex flex-col space-y-2">
        <span className="font-medium text-sm">
          Enter your preferred pick up location:
        </span>
        <input
          onChange={(e) => {
            setDetails({ ...details, preferred_address: e.target.value });
          }}
          type="text"
          name="pickUpLocation"
          id="pickUpLocation"
          className="w-full max-w-xl input input-sm input-bordered border-primary"
          value={details.preferred_address}
        />
        <p className="text-xs font-light text-gray-800 italic">
          * By default it is set to your address
        </p>
      </div>

      {/* Payment Details */}
      <div className="px-4 flex flex-col space-y-2">
        <span className="font-medium text-sm">Select preferred payment:</span>

        <div className="flex gap-4 flex-wrap">
          <div className="form-control space-x-2">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio border border-cbrown checked:bg-red-500"
                checked
              />
              <span className="label-text ml-4 font-bold">COD</span>
            </label>
          </div>
          <div className="form-control space-x-2">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio border border-cbrown checked:bg-red-500"
                disabled
              />
              <span className="label-text ml-4 font-bold">GCash</span>
            </label>
          </div>
          <div className="form-control space-x-2">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio border border-cbrown checked:bg-red-500"
                disabled
              />
              <span className="label-text ml-4 font-bold">PayMaya</span>
            </label>
          </div>
          <div className="form-control space-x-2">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio border border-cbrown checked:bg-red-500"
                disabled
              />
              <span className="label-text ml-4 font-bold">PayPal</span>
            </label>
          </div>
        </div>
        <p className="text-xs font-light text-gray-800 ">
          * For now we only support{" "}
          <span className="italic">COD (Cash On Delivery)</span> for our
          laundries
        </p>
      </div>
    </div>
  );
}

BookingDetails.propTypes = {
  selected: PropTypes.array.isRequired,
};
