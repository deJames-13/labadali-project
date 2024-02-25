/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import axiosClient from "../../axios-client";
import Modal from "../../components/Modal";
import { useStateContext } from "../../contexts/ContextProvider";
export default function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const { user, setUser } = useStateContext();
  const [data, setData] = useState(user.customer);

  const street1 = useRef();
  const city = useRef();
  const zipcode = useRef();
  const country = useRef();
  const region = useRef();

  const [userData, setUserData] = useState({
    ...data,
    email: user.email,
    id: user.id,
    username: user.username,
    image: null,
    role: "customer",
  });
  const [prevData, setPrevData] = useState(userData);

  const onSaveProfile = (e) => {
    e.preventDefault();
    console.log("Sending: ", userData);

    let reqForm = new FormData();

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const path = user.customer ? `/users/${userData.id}/` : "/users/";

    Object.keys(userData).forEach((key) => {
      reqForm.append(key, userData[key]);
    });
    userData.data && reqForm.append("_method", "PUT");
    axiosClient
      .post(path, reqForm, config)
      .then((response) => {
        console.log("Received: ", response.data);

        setUser(response.data);
        setIsEdit(false);
      })
      .catch((err) => {
        console.log(err);
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
    <>
      {user && !user.customer && (
        <div className="alert bg-red-400 mb-4">
          <div className="flex space-x-4 items-center">
            <i className="fas fa-warning"></i>
            <h1 className="font-bold">
              You have&apos;nt configured your profile
            </h1>
          </div>
          <span>Please fill up the form below.</span>
        </div>
      )}
      <form encType="multipart/form-data" onSubmit={onSaveProfile}>
        <div className="rounded-lg flex flex-col space-y-3 py-6 sm:px-6 border border-cbrown bg-secondary bg-opacity-30 text-center">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <h1 className="text-xl font-extrabold uppercase">Your Profile</h1>
            <div className="max-w-[120px] aspect-square p-2 border border-primary rounded-full">
              <img
                src={userData.image_path ?? "/img/nouser.jpeg"}
                alt=""
                className="w-full min-w-[90px] object-cover aspect-square rounded-full "
              />
            </div>
            {isEdit && (
              <>
                <label
                  htmlFor="profile_image"
                  className="btn btn-primary btn-sm font-bold text-cbrown"
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
          <div className="divider"></div>
          <div className="px-6 flex flex-col items-center space-y-3 sm:space-y-0 sm:flex-row sm:justify-between">
            <h1 className="font-bold uppercase text-left">
              Personal Information
            </h1>
            {!isEdit ? (
              <>
                <button
                  onClick={(ev) => {
                    ev.preventDefault();
                    setIsEdit(!isEdit);
                    setPrevData(userData);
                  }}
                  className="btn btn-sm btn-primary flex space-x-1 items-center"
                >
                  <i className="fas fa-pen"></i>
                  <span>Edit</span>
                </button>
              </>
            ) : (
              <div className="flex space-x-3 items-center">
                <button
                  onClick={(ev) => {
                    ev.preventDefault();
                    setIsEdit(!isEdit);
                    setUserData(prevData);
                  }}
                  className="btn btn-sm btn-primary flex space-x-1 items-center"
                >
                  <span>Cancel</span>
                </button>

                {/* SAVE */}
                <button
                  type="submit"
                  className="btn btn-sm btn-success flex space-x-1 items-center"
                >
                  <i className="fas fa-floppy-disk"></i>
                  <span>Save</span>
                </button>
              </div>
            )}
          </div>

          <div className="p-3 flex flex-col sm:grid sm:grid-cols-2 text-left">
            {/* USERNAME */}
            <div className="p-3 flex flex-col px-6">
              <h3 className="font-light uppercase text-opacity-50">Username</h3>
              {!isEdit ? (
                <p className="text-sm font-bold">{userData.username}</p>
              ) : (
                <input
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                  type="text"
                  className="font-bold input input-sm input-bordered  w-full   rounded-lg bg-transparent"
                  value={userData.username}
                />
              )}
            </div>

            {/* EMAIL */}
            <div className="p-3 flex flex-col px-6">
              <h3 className="font-light uppercase text-opacity-50">Email</h3>
              {!isEdit ? (
                <p className="text-sm font-bold">{userData.email}</p>
              ) : (
                <input
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  type="email"
                  className="font-bold input input-sm input-bordered  w-full   rounded-lg bg-transparent"
                  value={userData.email}
                />
              )}
            </div>

            {/* FIRST NAME */}
            <div className="p-3 flex flex-col px-6">
              <h3 className="font-light uppercase text-opacity-50">
                First Name
              </h3>
              {!isEdit ? (
                <p className="text-sm font-bold">{userData.first_name}</p>
              ) : (
                <input
                  onChange={(e) =>
                    setUserData({ ...userData, first_name: e.target.value })
                  }
                  type="text"
                  className="font-bold input input-sm input-bordered  w-full   rounded-lg bg-transparent"
                  value={userData.first_name}
                />
              )}
            </div>

            {/* LAST NAME */}
            <div className="p-3 flex flex-col px-6">
              <h3 className="font-light uppercase text-opacity-50">
                Last Name
              </h3>
              {!isEdit ? (
                <p className="text-sm font-bold">{userData.last_name}</p>
              ) : (
                <input
                  onChange={(e) =>
                    setUserData({ ...userData, last_name: e.target.value })
                  }
                  type="text"
                  className="font-bold input input-sm input-bordered  w-full   rounded-lg bg-transparent"
                  value={userData.last_name}
                />
              )}
            </div>

            {/* ADDRESS */}
            <div className="p-3 flex flex-col px-6 col-span-2">
              <h3 className="font-light uppercase text-opacity-50">Address</h3>
              <div className="flex space-x-4 items-center">
                <p className="text-sm font-bold">{userData.address}</p>
                {isEdit && (
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
              {!isEdit ? (
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
              {!isEdit ? (
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
        </div>
      </form>

      <Modal
        id={"setAddressModal"}
        title={<h1 className="font-bold uppercase text-lg">Change Address</h1>}
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
  );
}
