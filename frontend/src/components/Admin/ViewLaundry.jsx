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

    // FORM OBJECT
    let reqForm = new FormData();
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    const path = `/laundries${"/" + laundry.id}`;
    Object.keys(laundry).forEach((key) => {
      reqForm.append(key, laundry[key]);
    });
    reqForm.append("_method", "PUT");
    // END FORM OBJECT

    // console.log("Sending: ", userData);
    axiosClient
      .post(path, reqForm, config)
      .then(({ data }) => {
        // console.log("Received", data);
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

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setLaundry({
        ...laundry,
        image: event.target.files[0],
        image_path: URL.createObjectURL(event.target.files[0]),
      });
    }
  };
  let modal = document.getElementById("view-laundry-modal");
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setShowLaundry(false);
    }
  });
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
        <div className="flex items-start gap-4 ">
          <div className="w-1/2 avatar flex flex-col space-y-2 rounded-lg border-2 p-1 border-primary aspect-square shadow-xl">
            <img
              src={
                laundry.image_path
                  ? laundry.image_path
                  : "/img/samplelaundry.jpg"
              }
              alt={laundry.title}
              className="aspect-square w-full"
            />

            {edit && (
              <>
                <label
                  htmlFor="profile_image"
                  className="btn btn-primary btn-xs font-bold text-cbrown"
                >
                  Change Picture
                </label>
                <input
                  required
                  name="profile_image"
                  id="profile_image"
                  type="file"
                  onChange={onImageChange}
                  className="filetype hidden"
                  accept="images/*"
                />
              </>
            )}
          </div>
          <div className=" relative flex flex-col space-y-3 w-full">
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
              {!edit && (
                <p className="w-1/2 font-bold">{laundry.description}</p>
              )}
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

            {/* Min Kilo */}
            <div className="w-full flex space-x-3 text-sm items-center">
              <label htmlFor="title" className="font-light uppercase w-1/3">
                Min Kilo:
              </label>
              {!edit && (
                <p className="font-bold">{laundry.min_kilos ?? 1} kg</p>
              )}
              {edit && (
                <input
                  onChange={(e) =>
                    setLaundry({ ...laundry, min_kilos: e.target.value })
                  }
                  value={laundry.min_kilos ?? 1}
                  name="max_kilo"
                  id="max_kilo"
                  type="number"
                  className="input input-sm input-bordered w-2/3 focus:outline-none"
                />
              )}
            </div>
            {/* Cups */}
            <div className="w-full flex space-x-3 text-sm items-center">
              <label htmlFor="title" className="font-light uppercase w-1/3">
                Cups used per kilo:
              </label>
              {!edit && (
                <p className="font-bold">
                  {laundry.detergent_per_kilo ?? 1} ml
                </p>
              )}
              {edit && (
                <input
                  onChange={(e) =>
                    setLaundry({
                      ...laundry,
                      detergent_per_kilo: e.target.value,
                    })
                  }
                  value={laundry.detergent_per_kilo ?? 1}
                  name="max_kilo"
                  id="max_kilo"
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
