/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useStateContext();

  useEffect(() => {
    getUsers();
  }, [user]);
  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/users?_role=admin")
      .then(({ data }) => {
        setUsers(data);
        setLoading(false);
        console.log("Receive:", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="min-h-screen flex flex-col space-y-2">
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
        <h2>Selected Item: </h2>
      </div>

      <div className="overflow-x-auto h-3/4 rounded-lg shadow-lg p-1 lg:p-6 bg-secondary bg-opacity-20">
        {/* Table */}
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((u, index) => {
                return (
                  u.admin && (
                    <>
                      <tr>
                        <th>
                          <label>
                            <input type="checkbox" className="checkbox" />
                          </label>
                        </th>
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
                            Desktop Support Technician
                          </span>
                        </td>
                        <td>{u.admin.phone_number}</td>
                        <th>
                          <button className="btn btn-ghost btn-xs">
                            details
                          </button>
                        </th>
                      </tr>
                    </>
                  )
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
