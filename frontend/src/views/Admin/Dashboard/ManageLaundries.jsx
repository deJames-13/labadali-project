/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import AddLaundry from "../../../components/Admin/AddLaundry";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function ManageLaundries() {
  const [laundries, setLaundries] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useStateContext();

  useEffect(() => {
    getLaundries();
  }, [user]);
  const getLaundries = () => {
    setLoading(true);
    axiosClient
      .get("/laundries")
      .then(({ data }) => {
        setLaundries(data);
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
        <h2>Selected Item: </h2>
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
                  <tr key={index} className="">
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
                      <button className="btn btn-primary btn-xs">
                        <i className="fas fa-pen"></i>
                      </button>
                      <button className="btn btn-xs btn-error">
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
        <AddLaundry setLaundries={setLaundries} />
      }
    </div>
  );
}
