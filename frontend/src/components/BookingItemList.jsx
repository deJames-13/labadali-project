/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useState } from "react";
import Modal from "./Modal";
export default function BookingItemList({
  id,
  laundries,
  selected,
  setSelected,
}) {
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const laundry = laundries.find((laundry) => laundry.id == value);
    laundry.qty = 1;

    if (checked) {
      setSelected([laundry, ...selected]);
    } else {
      setSelected(selected.filter((laundry) => laundry.id != value));
    }
  };

  return (
    <Modal
      id={id}
      title={
        <>
          <i className="fas fa-shirt"></i>
          <h3 className="font-bold text-lg">Select Laundry Services</h3>
        </>
      }
      main={
        <>
          {/* List of booking services */}
          {laundries.length > 0 &&
            laundries.map((laundry) => {
              return (
                <div key={laundry.id}>
                  <div className="form-control ">
                    <label className="cursor-pointer label">
                      <div className="flex flex-col max-w-lg w-3/4">
                        <span className="label-text font-bold text-lg">
                          {laundry.title}
                        </span>
                        <span className="font-bold text-sm">
                          P{laundry.price}
                        </span>
                        <span className="font-light text-xs">
                          {laundry.description}
                        </span>
                      </div>
                      <input
                        onChange={handleCheckboxChange}
                        type="checkbox"
                        className="checkbox checkbox-secondary"
                        value={laundry.id}
                      />
                    </label>
                  </div>
                  <div className="divider"></div>
                </div>
              );
            })}
        </>
      }
      action={
        <form method="dialog">
          <button className="btn">Close</button>
        </form>
      }
    />
  );
}

BookingItemList.propTypes = {
  id: PropTypes.string,
  setSelectedLaundries: PropTypes.func,
  laundries: PropTypes.array,
  selected: PropTypes.array,
  setSelected: PropTypes.func,
};
BookingItemList.defaultProps = {};
