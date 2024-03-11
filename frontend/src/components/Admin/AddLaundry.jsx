import PropTypes from "prop-types";
import { useRef } from "react";
import axiosClient from "../../axios-client";
import Modal from "../Modal";
AddLaundry.propTypes = {
  setLaundries: PropTypes.func.isRequired,
};
export default function AddLaundry({ setLaundries }) {
  const title = useRef();
  const description = useRef();
  const price = useRef();
  const min_kilos = useRef();
  const detergent_per_kilo = useRef();
  const turnaround_day = useRef();

  const handleSave = (e) => {
    e.preventDefault();
    const data = {
      title: title.current.value,
      description: description.current.value,
      price: price.current.value,
      min_kilos: min_kilos.current.value,
      detergent_per_kilo: detergent_per_kilo.current.value,
      turnaround_day: turnaround_day.current.value,
    };
    axiosClient
      .post("/laundries", data)
      .then(({ data }) => {
        // console.log("Received", data);
        setLaundries((prev) => [data, ...prev]);
      })
      .catch((err) => {
        console.log(err);
      });
    document.getElementById("add-laundry-modal").close();
    // clear values
    title.current.value = "";
    description.current.value = "";
    price.current.value = "";
    min_kilos.current.value = "";
    detergent_per_kilo.current.value = "";
    turnaround_day.current.value = "";
  };

  return (
    <Modal
      id="add-laundry-modal"
      title={
        <h1 className="font-bold text-lg w-full text-left flex items-center space-x-3">
          <i className="fas fa-shirt"></i>
          <span>Add new laundry service</span>
        </h1>
      }
      main={
        <div className="flex flex-col space-y-3 w-full">
          {/* Name */}
          <div className="w-full flex space-x-3 text-sm items-center">
            <label htmlFor="title" className="font-bold uppercase w-1/3">
              Title:
            </label>
            <input
              ref={title}
              name="title"
              id="title"
              type="text"
              className="input input-sm input-bordered w-2/3 focus:outline-none"
              placeholder="Enter the laundry service name"
            />
          </div>
          {/* Description */}
          <div className="w-full flex space-x-3 text-sm items-center">
            <label htmlFor="title" className="font-bold uppercase w-1/3">
              Description:
            </label>
            <textarea
              ref={description}
              name="description"
              id="description"
              className="textarea textarea-bordered focus:outline-none max-h-24 w-2/3"
              placeholder="Describe the laundry service"
            ></textarea>
          </div>

          {/* Price */}
          <div className="w-full flex space-x-3 text-sm items-center">
            <label htmlFor="title" className="font-bold uppercase w-1/3">
              Price:
            </label>
            <input
              ref={price}
              name="price"
              id="price"
              type="number"
              className="input input-sm input-bordered w-2/3 focus:outline-none"
            />
          </div>

          {/* Min Kilo */}
          <div className="w-full flex space-x-3 text-sm items-center">
            <label htmlFor="title" className="font-bold uppercase w-1/3">
              Minimum kilo:
            </label>
            <input
              ref={min_kilos}
              name="min_kilos"
              id="min_kilos"
              type="number"
              className="input input-sm input-bordered w-2/3 focus:outline-none"
            />
          </div>
          <div className="w-full flex space-x-3 text-sm items-center">
            <label htmlFor="title" className="font-bold uppercase w-1/3">
              Cups of detergent to use (in ml):
            </label>
            <input
              ref={detergent_per_kilo}
              name="detergent_per_kilo"
              id="detergent_per_kilo"
              type="number"
              className="input input-sm input-bordered w-2/3 focus:outline-none"
            />
          </div>
          <div className="w-full flex space-x-3 text-sm items-center">
            <label htmlFor="title" className="font-bold uppercase w-1/3">
              Turn Around Days:
            </label>
            <input
              ref={turnaround_day}
              name="turnaround_day"
              id="turnaround_day"
              type="number"
              className="input input-sm input-bordered w-2/3 focus:outline-none"
            />
          </div>
        </div>
      }
      action={
        <>
          <form method="dialog">
            <div className="flex items-center space-x-3">
              <button className="btn">Cancel</button>
              <button onClick={handleSave} className="btn btn-success">
                Save
              </button>
            </div>
          </form>
        </>
      }
    />
  );
}
