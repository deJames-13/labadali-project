/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import Modal from "../Modal";
ViewUser.propTypes = {
  setShowUser: PropTypes.func.isRequired,
};

export default function ViewUser({ setShowUser, ...u }) {
  const { setNotification } = useStateContext();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    ...u.admin,
    email: u.email,
    id: u.id,
    username: u.username,
    image: u.image_path ?? null,
    role: "admin",
  });
  const [prevData, setPrevData] = useState(userData);

  const onToggleEdit = (s) => {
    if (s) {
      setUserData(prevData);
    }
    setEdit(!edit);
  };

  const street1 = useRef();
  const city = useRef();
  const region = useRef();
  const country = useRef();
  const zipcode = useRef();

  const onSaveProfile = (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Sending: ", userData);
    // FORM OBJECT
    let reqForm = new FormData();
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    const path = "/users/" + userData.id;
    Object.keys(userData).forEach((key) => {
      reqForm.append(key, userData[key]);
    });
    userData.data && reqForm.append("_method", "PUT");
    // END FORM OBJECT

    axiosClient
      .post(path, reqForm, config)
      .then((response) => {
        console.log("Received: ", response.data);

        setNotification("Fetch success", 5000, "green-400");
        setLoading(false);
        setShowUser(false);
        setUserData(response.data);
        setEdit(false);
      })
      .catch((err) => {
        const e = err.response;
        if (e && e.status === 422) {
          console.log(e);
          const errors =
            e.data.message ?? Object.values(e.data.errors).join("\n");
          setNotification(e.data.message, 5000, "red-400");
          setEdit(!edit);
          setUserData(prevData);
          setLoading(false);
        }
      });
  };
  const onSaveAddress = (e) => {
    e.preventDefault();
    country.current.value =
      country.current.value == "" ? "Philippines" : country.current.value;
    const newAddress = [
      street1.current.value,
      city.current.value,
      region.current.value,
      country.current.value,
      zipcode.current.value,
    ].join(", ");
    setUserData({
      ...userData,
      city: city.current.value,
      zipcode: zipcode.current.value,
      address: newAddress,
    });
    document.getElementById("setAddressModal").close();
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setUserData({
        ...userData,
        image: event.target.files[0],
        image_path: URL.createObjectURL(event.target.files[0]),
      });
    }
  };
  const onDateChange = (e) => {
    const birthdate = new Date(e.target.value);
    const currentDate = new Date();
    var age = currentDate.getFullYear() - birthdate.getFullYear();

    const monthDiff = currentDate.getMonth() - birthdate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < birthdate.getDate())
    ) {
      age--;
    }
    setUserData({
      ...userData,
      age: age,
      birthdate: e.target.value,
    });
  };
  return (
    <Modal
      id="view-user-modal"
      title={
        <div className="flex items-center space-x-2 text-2xl">
          <i className="fas fa-user"></i>
          <h1 className="text-left w-full font-bold text-xl">
            User Information: ID {userData.id}
          </h1>
        </div>
      }
      main={
        <>
          {loading && (
            <div className="fixed inset-0 w-full h-full z-99 bg-gray-700 bg-opacity-50 grid place-items-center">
              <div className="loading loading-lg"></div>
            </div>
          )}
          <div className="w-full flex flex-col space-y-3 items-center sm:flex-row  sm:space-y-0 sm:space-x-6 sm:items-start">
            <div className="avatar flex flex-col space-y-2 rounded-lg border-2 p-1 border-primary aspect-square w-1/3 shadow-xl">
              <img
                src={userData.image_path}
                alt={userData.username}
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

            <div className="w-full grid grid-cols-2 items-center transition-all ease-in">
              {/* username */}
              <p htmlFor="username" className="p  font-bold text-gray-700">
                Username:{" "}
              </p>
              {!edit && (
                <h1 className="text-left w-full">{userData.username}</h1>
              )}
              {edit && (
                <input
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  className="input input-xs rounded-none border-b-2 border-0 border-gray-400 my-1 focus:outline-none  text-left w-full"
                  defaultValue={userData.username}
                />
              )}

              {/* Name */}
              <p htmlFor="name" className="p  font-bold text-gray-700">
                Name:{" "}
              </p>
              {!edit && (
                <h1 className="text-left w-full font-bold text-xl">
                  {userData.first_name + " " + userData.last_name}
                </h1>
              )}
              {edit && (
                <div id="name" className="flex">
                  <input
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        first_name: e.target.value,
                      })
                    }
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="First Name"
                    className="input input-xs rounded-none border-b-2 border-0 border-gray-400 my-1 focus:outline-none  text-left w-full"
                    defaultValue={userData.first_name}
                  />
                  <input
                    onChange={(e) =>
                      setUserData({ ...userData, last_name: e.target.value })
                    }
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Last Name"
                    className="input input-xs rounded-none border-b-2 border-0 border-gray-400 my-1 focus:outline-none  text-left w-full"
                    defaultValue={userData.last_name}
                  />
                </div>
              )}

              {/* Email */}
              <p htmlFor="email" className="p  font-bold text-gray-700">
                Email:{" "}
              </p>
              {!edit && (
                <h1 className="text-left w-full font-bold text-medium">
                  {userData.email}
                </h1>
              )}
              {edit && (
                <input
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="input input-xs rounded-none border-b-2 border-0 border-gray-400 my-1 focus:outline-none  text-left w-full"
                  defaultValue={userData.email}
                />
              )}
              {/* Phone Number */}
              <p htmlFor="phone_number" className="p  font-bold text-gray-700">
                Contact:{" "}
              </p>
              {!edit && (
                <h1 className="text-left w-full text-sm">
                  {userData.phone_number}
                </h1>
              )}

              {edit && (
                <input
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      phone_number: e.target.value,
                    })
                  }
                  type="text"
                  name="phone_number"
                  id="phone_number"
                  placeholder="Phone Number"
                  className="input input-xs rounded-none border-b-2 border-0 border-gray-400 my-1 focus:outline-none  text-left w-full"
                  defaultValue={userData.phone_number}
                />
              )}

              {/* Position */}
              <p htmlFor="position" className="p  font-bold text-gray-700">
                Position:{" "}
              </p>
              {!edit && (
                <h1 className="text-left w-full text-sm">
                  {userData.position}
                </h1>
              )}
              {edit && (
                <input
                  onChange={(e) =>
                    setUserData({ ...userData, position: e.target.value })
                  }
                  type="text"
                  name="position"
                  id="position"
                  placeholder="Position"
                  className="input input-xs rounded-none border-b-2 border-0 border-gray-400 my-1 focus:outline-none  text-left w-full"
                  defaultValue={userData.position}
                />
              )}
            </div>
          </div>
          <div className="divider"></div>

          <div className="grid md:grid-cols-2">
            {/* ADDRESS */}
            <div className="p-3 flex flex-col px-6 col-span-2">
              <h3 className="font-light uppercase text-opacity-50">Address</h3>
              <div className="flex space-x-4 items-center">
                <p className="text-sm font-bold">{userData.address}</p>
                {edit && (
                  <i
                    onClick={() =>
                      document.getElementById("setAddressModal").showModal()
                    }
                    className="fas fa-pen btn btn-xs btn-secondary aspect-square"
                  ></i>
                )}
              </div>
            </div>

            {/* CITY */}
            <div className="p-3 flex flex-col px-6">
              <h3 className="font-light uppercase text-opacity-50">City</h3>
              <p className="text-sm font-bold">{userData.city}</p>
            </div>

            {/* ZIP CODE */}
            <div className="p-3 flex flex-col px-6">
              <h3 className="font-light uppercase text-opacity-50">Zip Code</h3>
              <p className="text-sm font-bold">{userData.zip_code}</p>
            </div>

            {/* PHONE NUMBER */}
            <div className="sm:col-span-2 p-3 flex flex-col px-6">
              <h3 className="font-light uppercase text-opacity-50">
                Phone number
              </h3>
              {!edit ? (
                <p className="text-sm font-bold">{userData.phone_number}</p>
              ) : (
                <input
                  onChange={(e) =>
                    setUserData({ ...userData, phone_number: e.target.value })
                  }
                  type="text"
                  className="font-bold input input-sm input-bordered  w-full   rounded-lg bg-transparent"
                  value={userData.phone_number}
                />
              )}
            </div>

            {/* BIRTH DATE */}
            <div className="p-3 flex flex-col px-6">
              <h3 className="font-light uppercase text-opacity-50">
                Birth Date
              </h3>
              {!edit ? (
                <p className="text-sm font-bold">{userData.birthdate}</p>
              ) : (
                <input
                  onChange={onDateChange}
                  type="date"
                  className="font-bold input input-sm input-bordered  w-full   rounded-lg bg-transparent"
                  value={userData.birthdate}
                />
              )}
            </div>

            {/* AGE */}
            <div className="p-3 flex flex-col px-6">
              <h3 className="font-light uppercase text-opacity-50">Age</h3>
              <p className="text-sm font-bold">{userData.age}</p>
            </div>
          </div>

          {/* ADDRESS MODAL */}
          <Modal
            id={"setAddressModal"}
            title={
              <h1 className="font-bold uppercase text-lg">Change Address</h1>
            }
            main={
              <div className="flex flex-col space-y-3 justify-center">
                <div className="flex flex-col space-y-1 px-3">
                  <label htmlFor="street1">Street Address & Barangay</label>
                  <input
                    ref={street1}
                    type="text"
                    className="input input-sm input-bordered"
                  />
                </div>
                <div className="flex flex-col space-y-1 px-3">
                  <label htmlFor="city">City</label>
                  <input
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        city: e.target.value,
                      })
                    }
                    ref={city}
                    value={userData.city}
                    type="text"
                    className="input input-sm input-bordered"
                  />
                </div>
                <div className="flex flex-col space-y-1 px-3">
                  <label htmlFor="city">Region/Province</label>
                  <input
                    ref={region}
                    type="text"
                    className="input input-sm input-bordered"
                  />
                </div>
                <div className="flex flex-col space-y-1 px-3">
                  <label htmlFor="city">Country</label>
                  <input
                    ref={country}
                    type="text"
                    className="input input-sm input-bordered"
                    placeholder="Philippines"
                  />
                </div>

                <div className="flex flex-col space-y-1 px-3">
                  <label htmlFor="zipcode">Zip Code</label>
                  <input
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        zip_code: e.target.value,
                      })
                    }
                    ref={zipcode}
                    value={userData.zip_code}
                    type="text"
                    className="input input-sm input-bordered"
                  />
                </div>
              </div>
            }
            action={
              <>
                <form method="dialog">
                  <button className="btn">Close</button>
                  <button onClick={onSaveAddress} className="btn">
                    Save
                  </button>
                </form>
              </>
            }
          />
        </>
      }
      action={
        <form method="dialog" className="flex justify-end gap-2">
          {!edit && (
            <>
              <button className="btn btn-ghost">Close</button>
              <button onClick={onToggleEdit} className="btn btn-primary ">
                Edit
              </button>
            </>
          )}
          {edit && (
            <>
              <button onClick={(e) => onToggleEdit(1)} className="btn bg-error">
                Cancel
              </button>
              <button onClick={onSaveProfile} className="btn btn-success ">
                Save
              </button>
            </>
          )}
        </form>
      }
    />
  );
}
