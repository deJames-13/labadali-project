import { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
export default function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useStateContext();
  const data = user.customer ?? {};
  const [userData, setUserData] = useState({
    ...data,
    email: user.email,
    username: user.username,
  });

  return (
    <>
      <div className="rounded-lg flex flex-col space-y-3 py-6 sm:px-6 border border-cbrown bg-secondary bg-opacity-30 text-center">
        <div className="flex flex-col space-y-3 justify-center items-center">
          <h1 className="text-xl font-extrabold uppercase">Your Profile</h1>
          <div className="max-w-[120px] aspect-square p-2 border border-primary rounded-full">
            <img src="img/rizza-icon.png" alt="" className="w-full" />
          </div>
          <button className="btn btn-primary btn-sm font-bold text-cbrown">
            Change Picture
          </button>
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
                }}
                className="btn btn-sm btn-primary flex space-x-1 items-center"
              >
                <span>Cancel</span>
              </button>

              <button
                onClick={(ev) => {
                  ev.preventDefault();
                  setIsEdit(!isEdit);
                }}
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
            <h3 className="font-light uppercase text-opacity-50">First Name</h3>
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
            <h3 className="font-light uppercase text-opacity-50">Last Name</h3>
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
                <i className="fas fa-pen btn btn-xs btn-secondary aspect-square"></i>
              )}
            </div>
          </div>

          <div className="p-3 flex flex-col px-6">
            <h3 className="font-light uppercase text-opacity-50">City</h3>
            <p className="text-sm font-bold">{userData.city}</p>
          </div>
          <div className="p-3 flex flex-col px-6">
            <h3 className="font-light uppercase text-opacity-50">Zip Code</h3>
            <p className="text-sm font-bold">{userData.zip_code}</p>
          </div>
          <div className="p-3 flex flex-col px-6">
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
          <div></div>

          <div className="p-3 flex flex-col px-6">
            <h3 className="font-light uppercase text-opacity-50">Birth Date</h3>
            {!isEdit ? (
              <p className="text-sm font-bold">{userData.birthdate}</p>
            ) : (
              <input
                onChange={(e) =>
                  setUserData({ ...userData, birthdate: e.target.value })
                }
                type="date"
                className="font-bold input input-sm input-bordered  w-full   rounded-lg bg-transparent"
                value={userData.birthdate}
              />
            )}
          </div>
          <div className="p-3 flex flex-col px-6">
            <h3 className="font-light uppercase text-opacity-50">Age</h3>
            {!isEdit ? (
              <p className="text-sm font-bold">{userData.age}</p>
            ) : (
              <input
                onChange={(e) =>
                  setUserData({ ...userData, age: e.target.value })
                }
                type="text"
                disabled
                className="font-bold input input-sm input-bordered  w-full   rounded-lg bg-transparent"
                value={userData.age}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
