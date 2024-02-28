/* eslint-disable no-unused-vars */
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import Modal from "../Modal";

ViewLaundry.propTypes = {
  setLaundries: PropTypes.func.isRequired,
  setShowLaundry: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default function ViewLaundry({ data, setLaundries, setShowLaundry }) {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [laundry, setLaundry] = useState(data);

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...laundry,
      updated_at: new Date().toISOString,
    };
    console.log("Received", payload);
    axiosClient
      .put("/laundries/" + laundry.id, payload)
      .then(({ data }) => {
        console.log("Received", data);
        setLaundry(data);
        setLaundries((prev) => prev.map((p) => (p.id === data.id ? data : p)));
        setLoading(false);
        setEdit(!edit);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCancel = () => {
    setLaundry(data);
    setShowLaundry(false);
  };

  return (
    <Modal
      id="view-laundry-modal"
      title={
        <h1 className="font-bold text-lg w-full text-left flex items-center space-x-3">
          <i className="fas fa-shirt"></i>
          <span>
            {!edit ? "View Laundry" : "Edit Laundry"}{" "}
            {loading && <span className="loading loading-ring"></span>}
          </span>
        </h1>
      }
      main={
        <div className="relative flex flex-col space-y-3 w-full">
          {/* Name */}
          <div className="w-full flex space-x-3 text-sm items-center">
            <label htmlFor="title" className="font-light uppercase w-1/3">
              Title:
            </label>
            {!edit && <p className="font-bold">{laundry.title}</p>}
            {edit && (
              <input
                onChange={(e) =>
                  setLaundry({ ...laundry, title: e.target.value })
                }
                value={laundry.title}
                name="title"
                id="title"
                type="text"
                className="input input-sm input-bordered w-2/3 focus:outline-none"
                placeholder="Enter the laundry service name"
              />
            )}
          </div>
          {/* Description */}
          <div className="w-full flex space-x-3 text-sm items-center">
            <label htmlFor="title" className="font-light uppercase w-1/3">
              Description:
            </label>
            {!edit && <p className="font-bold">{laundry.description}</p>}
            {edit && (
              <textarea
                onChange={(e) =>
                  setLaundry({ ...laundry, description: e.target.value })
                }
                value={laundry.description}
                name="description"
                id="description"
                className="textarea textarea-bordered w-2/3 focus:outline-none max-h-24"
                placeholder="Describe the laundry service"
              ></textarea>
            )}
          </div>

          {/* Price */}
          <div className="w-full flex space-x-3 text-sm items-center">
            <label htmlFor="title" className="font-light uppercase w-1/3">
              Price:
            </label>
            {!edit && <p className="font-bold">P {laundry.price}</p>}
            {edit && (
              <input
                onChange={(e) =>
                  setLaundry({ ...laundry, price: e.target.value })
                }
                value={laundry.price}
                name="price"
                id="price"
                type="number"
                className="input input-sm input-bordered w-2/3 focus:outline-none"
              />
            )}
          </div>

          {/* Max Kilo */}
          <div className="w-full flex space-x-3 text-sm items-center">
            <label htmlFor="title" className="font-light uppercase w-1/3">
              Max Kilo:
            </label>
            {!edit && <p className="font-bold">{laundry.max_kilo}kg</p>}
            {edit && (
              <input
                onChange={(e) =>
                  setLaundry({ ...laundry, max_kilo: e.target.value })
                }
                value={laundry.max_kilo}
                name="max_kilo"
                id="max_kilo"
                type="number"
                className="input input-sm input-bordered w-2/3 focus:outline-none"
              />
            )}
          </div>
          {/* Max Items */}
          <div className="w-full flex space-x-3 text-sm items-center">
            <label htmlFor="title" className="font-light uppercase w-1/3">
              Max Items:
            </label>
            {!edit && <p className="font-bold">x{laundry.max_items}</p>}
            {edit && (
              <input
                onChange={(e) =>
                  setLaundry({ ...laundry, max_items: e.target.value })
                }
                value={laundry.max_items}
                name="max_items"
                id="max_items"
                type="number"
                className="input input-sm input-bordered w-2/3 focus:outline-none"
              />
            )}
          </div>
          {/* Turn Around Days */}
          <div className="w-full flex space-x-3 text-sm items-center">
            <label htmlFor="title" className="font-light uppercase w-1/3">
              Turn Around Days:
            </label>
            {!edit && (
              <p className="font-bold">{laundry.turnaround_day} days</p>
            )}
            {edit && (
              <input
                onChange={(e) =>
                  setLaundry({ ...laundry, turnaround_day: e.target.value })
                }
                value={laundry.turnaround_day}
                name="turnaround_day"
                id="turnaround_day"
                type="number"
                className="input input-sm input-bordered w-2/3 focus:outline-none"
              />
            )}
          </div>
        </div>
      }
      action={
        <>
          <div className="flex items-center space-x-3">
            {!edit && (
              <>
                <button onClick={handleCancel} className="btn">
                  Close
                </button>
                <button
                  onClick={(e) => setEdit(!edit)}
                  className="btn btn-primary"
                >
                  Edit
                </button>
              </>
            )}
            {edit && (
              <>
                <button onClick={(e) => setEdit(!edit)} className="btn">
                  Cancel
                </button>
                <button onClick={handleSave} className="btn btn-success">
                  Save
                </button>
              </>
            )}
          </div>
        </>
      }
    />
  );
}
