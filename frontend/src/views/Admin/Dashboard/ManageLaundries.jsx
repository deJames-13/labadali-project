/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import AddLaundry from "../../../components/Admin/AddLaundry";
import ViewLaundry from "../../../components/Admin/ViewLaundry";
import Modal from "../../../components/Modal";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function ManageLaundries() {
  const [selected, setSelected] = useState({});
  const [laundries, setLaundries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLaundry, setShowLaundry] = useState(false);
  const { user } = useStateContext();

  useEffect(() => {
    getLaundries();

    showLaundry && document.getElementById("view-laundry-modal").showModal();
  }, [user, showLaundry]);
  const getLaundries = () => {
    setLoading(true);
    axiosClient
      .get("/laundries")
      .then(({ data }) => {
        setLaundries(data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Control Modals
  const toggleAddLaundry = () => {
    document.getElementById("add-laundry-modal").showModal();
  };
  const handleSelect = (id) => {
    setSelected(laundries.filter((l) => l.id === id)[0]);
  };

  const viewLaundry = (id) => {
    setShowLaundry(true);
  };

  const handleDelete = (id) => {
    document.getElementById("delete-laundry-modal").showModal();
  };
  const onDelete = (id) => {
    document.getElementById("delete-laundry-modal").showModal();
  };

  return (
    <div className=" min-h-screen flex flex-col space-y-6">
      <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:justify-between lg:items-center">
        <div className="flex space-x-3 uppercase font-bold text-2xl  items-center">
          <i className="fas fa-shirt"></i>
          <h1>
            Laundries{" "}
            {loading && <span className="loading loading-dots"></span>}{" "}
          </h1>
        </div>

        <div className="lg:max-w-sm flex justify-end px-6 items-center space-x-3 border rounded-full border-cbrown">
          <input
            type="text"
            className="w-full input input-sm input-ghost input-md bg-transparent focus:border-none focus:outline-none"
          />
          <i className="fas fa-magnifying-glass "></i>
        </div>
      </div>

      <div className="flex space-x-3 justify-between font-bold items-center">
        <h2>Selected Item: {selected.id ?? "_"}</h2>
        <button onClick={toggleAddLaundry} className="btn btn-sm bg-green-400">
          <i className="fas fa-plus"></i>
          Add New
        </button>
      </div>

      <div className="overflow-x-auto h-3/4 rounded-lg shadow-lg p-1 lg:p-6 bg-secondary bg-opacity-20">
        <table className="table table-xs table-pin-rows table-pin-cols ">
          <thead className="border-b-2 border-cbrown uppercase mb-4">
            <tr className="">
              <th>ID</th>
              <td>Title</td>
              <td>Price</td>
              <td>Max Kilos</td>
              <td>Max Items</td>
              <td>Turn Around</td>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {laundries &&
              laundries.map((laundry, index) => {
                return (
                  <tr
                    key={index}
                    onClick={(e) => {
                      handleSelect(laundry.id);
                    }}
                    onDoubleClick={viewLaundry}
                  >
                    <th>{laundry.id}</th>
                    <td>
                      <div className="flex space-x-2">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={
                              laundry.image_path ??
                              "https://picsum.photos/640/480?random=" +
                                new Date().getTime() +
                                "&text=" +
                                laundry.title
                            }
                            alt={laundry.title}
                            className="object-cover w-full h-full rounded-lg"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="font-bold">{laundry.title}</h3>
                          <p>{laundry.description}</p>
                        </div>
                      </div>
                    </td>
                    <td>{laundry.price}</td>
                    <td>{laundry.max_kilo}</td>
                    <td>{laundry.max_items}</td>
                    <td>{laundry.turnaround_day}</td>
                    <th className="h-12 flex justify-center items-center space-x-3">
                      <button
                        onClick={viewLaundry}
                        className="btn btn-primary btn-xs"
                      >
                        <i className="fas fa-pen"></i>
                      </button>
                      <button
                        onClick={handleDelete}
                        className="btn btn-xs btn-error"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {
        /* MODALS */
        <>
          <AddLaundry setLaundries={setLaundries} />
          {showLaundry && (
            <ViewLaundry
              setShowLaundry={setShowLaundry}
              data={selected}
              setLaundries={setLaundries}
            />
          )}

          <Modal
            id="delete-laundry-modal"
            title={
              <h1 className="font-bold text-lg w-full text-left flex items-center space-x-3">
                <i className="fas fa-shirt"></i>
                <span>
                  Delete Laundry {selected.id ?? "_ "}
                  {loading && <span className="loading loading-ring"></span>}
                </span>
              </h1>
            }
            main={
              <h2 className="font-medium">
                Are you sure you want to delete laundry with title:{" "}
                <span className="font-bold italic">{selected.title}</span> ?
              </h2>
            }
            action={
              <>
                <form method="dialog">
                  <div className="flex items-center space-x-3">
                    <button className="btn">Cancel</button>
                    <button onClick={onDelete} className="btn btn-error">
                      Confirm
                    </button>
                  </div>
                </form>
              </>
            }
          />
        </>
      }
    </div>
  );
}
