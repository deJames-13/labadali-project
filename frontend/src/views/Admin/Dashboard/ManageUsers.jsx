/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import ViewUser from "../../../components/Admin/ViewUser";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useStateContext();
  const [selected, setSelected] = useState(null);
  const [showUser, setShowUser] = useState(false);

  useEffect(() => {
    getUsers();

    showUser && document.getElementById("view-user-modal").showModal();
  }, [user, showUser]);
  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/users?_role=admin")
      .then(({ data }) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="h-screen min-h-screen flex flex-col space-y-2">
        <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:justify-between lg:items-center">
          <div className="flex space-x-3 uppercase font-bold text-2xl  items-center">
            <i className="fas fa-users"></i>
            <h1>
              User Accounts{" "}
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

        <div className="flex space-x-3 font-bold items-center">
          <h2>Selected Item: {selected && selected.id}</h2>
        </div>

        <div className="overflow-x-auto max-h-3/4 rounded-lg shadow-lg p-1 lg:p-6 bg-secondary bg-opacity-20">
          {/* Table */}
          <table className="table table-xs table-pin-rows table-pin-cols">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th></th>
              </tr>
            </thead>
            <tbody id="userbody">
              {users &&
                users.map((u, index) => {
                  return (
                    u.admin && (
                      <tr
                        key={index}
                        onClick={(e) => {
                          setSelected(u);
                        }}
                        onDoubleClick={(e) => {
                          setShowUser(true);
                        }}
                      >
                        <th> {u.admin.id}</th>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src={u.admin.image_path}
                                  alt={u.username}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{u.username}</div>
                              <div className="text-sm opacity-50">{`${u.admin.first_name} ${u.admin.last_name}`}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          {u.email}
                          <br />
                          <span className="badge badge-ghost badge-sm">
                            {u.admin.position}
                          </span>
                        </td>
                        <td>{u.admin.phone_number}</td>
                        <th>
                          <button
                            onClick={(e) => {
                              setShowUser(true);
                            }}
                            className="btn btn-ghost btn-xs"
                          >
                            details
                          </button>
                        </th>
                      </tr>
                    )
                  );
                })}
            </tbody>
          </table>
          {!users.length > 0 && !loading && (
            <div className="py-6 w-full space-x-4 flex justify-center items-center">
              <button
                id="addfirst"
                className="aspect-square btn btn-sm btn-primary rounded-lg"
              >
                <i className="fas fa-plus"></i>
              </button>
              <label htmlFor="addfirst" className="label">
                No users found. Click + to create new user.
              </label>
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}
      {<>{showUser && <ViewUser setShowUser={setShowUser} {...selected} />}</>}
    </>
  );
}
