/* eslint-disable no-unused-vars */
import { debounce } from "lodash";
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
  const [search, setSearch] = useState(null);
  const { user } = useStateContext();

  useEffect(() => {
    const s = search ? `_search=${search}` : "";
    const query = `${s}`;
    getLaundries(query);

    showLaundry && document.getElementById("view-laundry-modal").showModal();
  }, [user, showLaundry, search]);

  const getLaundries = (query) => {
    setLoading(true);
    axiosClient
      .get("/trashed/laundries" + `${"?" + query ?? ""}`)
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

  const handleRestore = (id) => {
    document.getElementById("restore-laundry-modal").showModal();
  };
  const onRestore = () => {
    restoreLaundry(selected.id);
  };

  const restoreLaundry = (id) => {
    setLoading(true);
    axiosClient
      .post("/trashed/laundries/restore/" + id)
      .then(({ data }) => {
        getLaundries();
        setLoading(false);
        document.getElementById("restore-laundry-modal").close();
        setSelected({});
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSearch = debounce((e) => {
    e.preventDefault();
    const q = e.target.value;
    setSearch(q);
  }, 500);
  return (
    <div className="h-screen min-h-screen flex flex-col space-y-6">
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
            onChange={onSearch}
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

      <div className="overflow-x-auto max-h-3/5 rounded-lg shadow-lg p-1 lg:p-6 bg-secondary bg-opacity-20">
        <table className="table table-xs table-pin-rows table-pin-cols ">
          <thead className="">
            <tr className="border-b-2 border-cbrown uppercase mb-4">
              <th>ID</th>
              <td>Title</td>
              <td>Price</td>
              <td>Min Kilos</td>
              <td>Detergent (in mL)</td>
              <td>Turn Around</td>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {laundries.length > 0 &&
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
                        <div
                          className={`avatar ${
                            !laundry.image_path ? "placeholder" : ""
                          }`}
                        >
                          <div className="bg-neutral text-neutral-content text-center mask mask-squircle w-12 h-12">
                            {laundry.image_path ? (
                              <img
                                src={laundry.image_path}
                                alt={laundry.title}
                              />
                            ) : (
                              <span>{laundry.title[0]}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <h3 className="font-bold">{laundry.title}</h3>
                          <p>{laundry.description}</p>
                        </div>
                      </div>
                    </td>
                    <td>{laundry.price}</td>
                    <td>{laundry.min_kilos ?? 1}</td>
                    <td>{laundry.detergent_per_kilo ?? "n/a"}</td>
                    <td>{laundry.turnaround_day}</td>
                    <th className="h-12 flex justify-center items-center space-x-3">
                      <button
                        onClick={viewLaundry}
                        className="btn btn-primary btn-xs"
                      >
                        <i className="fas fa-pen"></i>
                      </button>
                      <button
                        onClick={handleRestore}
                        className="btn btn-xs btn-success"
                      >
                        <i className="fas fa-heart"></i>
                      </button>
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {!laundries.length > 0 && !loading && !search && (
        <div className="py-6 w-full space-x-4 flex justify-center items-center">
          
        <label htmlFor="addfirst" className="label">
          No laundries found in trash.
        </label>
      </div>
        )}
      </div>

      {
        /* MODALS */
        <>
          <AddLaundry setLaundries={setLaundries} />
          {showLaundry && (
            <ViewLaundry
              setShowLaundry={setShowLaundry}
              setLaundries={setLaundries}
              data={selected}
            />
          )}

          <Modal
            id="restore-laundry-modal"
            title={
              <h1 className="font-bold text-lg w-full text-left flex items-center space-x-3">
                <i className="fas fa-shirt"></i>
                <span>
                  Restore Laundry {selected.id ?? "_ "}
                  {loading && <span className="loading loading-ring"></span>}
                </span>
              </h1>
            }
            main={
              <h2 className="font-medium">
                Do you want to restore this laundry? {" "}
                <span className="font-bold italic">{selected.title}</span> ?
              </h2>
            }
            action={
              <>
                <form method="dialog">
                  <div className="flex items-center space-x-3">
                    <button className="btn">Cancel</button>
                    <button onClick={onRestore} className="btn btn-success">
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
