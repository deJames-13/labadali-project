import { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
export default function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useStateContext();
  const data = user.customer ?? {};

  return (
    <>
      <div className="rounded-lg flex flex-col space-y-3 p-6 border border-cbrown bg-secondary bg-opacity-30 text-center">
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
        <div className="px-6 flex justify-between items-center">
          <h1 className="font-bold uppercase text-left">
            Personal Information
          </h1>
          {isEdit ? (
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

        <div className="p-3 grid sm:grid-cols-2  text-left">
          <div className="p-3 flex flex-col px-6">
            <h3 className="font-light uppercase text-opacity-50">Username</h3>
            {isEdit ? (
              <p className="text-sm font-bold">{user.username}</p>
            ) : (
              <input
                type="text"
                className="font-bold input input-sm input-bordered w-3/4  rounded-lg bg-transparent"
                value={user.username}
              />
            )}
          </div>
          <div className="p-3 flex flex-col px-6">
            <h3 className="font-light uppercase text-opacity-50">Email</h3>
            {isEdit ? (
              <p className="text-sm font-bold">{user.email}</p>
            ) : (
              <input
                type="email"
                className="font-bold input input-sm input-bordered w-3/4  rounded-lg bg-transparent"
                value={user.email}
              />
            )}
          </div>
          <div className="p-3 flex flex-col px-6">
            <h3 className="font-light uppercase text-opacity-50">First Name</h3>
            {isEdit ? (
              <p className="text-sm font-bold">{data.first_name}</p>
            ) : (
              <input
                type="text"
                className="font-bold input input-sm input-bordered w-3/4  rounded-lg bg-transparent"
                value={data.first_name}
              />
            )}
          </div>
          <div className="p-3 flex flex-col px-6">
            <h3 className="font-light uppercase text-opacity-50">Last Name</h3>
            {isEdit ? (
              <p className="text-sm font-bold">{data.last_name}</p>
            ) : (
              <input
                type="text"
                className="font-bold input input-sm input-bordered w-3/4  rounded-lg bg-transparent"
                value={data.last_name}
              />
            )}
          </div>
          <div className="p-3 flex flex-col px-6 col-span-2">
            <h3 className="font-light uppercase text-opacity-50">Address</h3>
            {isEdit ? (
              <p className="text-sm font-bold">{data.address}</p>
            ) : (
              <input
                type="text"
                className="font-bold input input-sm input-bordered w-3/4  rounded-lg bg-transparent"
                value={data.address}
              />
            )}
          </div>
          <div className="p-3 flex flex-col px-6">
            <h3 className="font-light uppercase text-opacity-50">City</h3>
            {isEdit ? (
              <p className="text-sm font-bold">{data.city}</p>
            ) : (
              <input
                type="text"
                className="font-bold input input-sm input-bordered w-3/4  rounded-lg bg-transparent"
                value={data.city}
              />
            )}
          </div>
          <div className="p-3 flex flex-col px-6">
            <h3 className="font-light uppercase text-opacity-50">Zip Code</h3>
            {isEdit ? (
              <p className="text-sm font-bold">{data.zip_code}</p>
            ) : (
              <input
                type="text"
                className="font-bold input input-sm input-bordered w-3/4  rounded-lg bg-transparent"
                value={data.zip_code}
              />
            )}
          </div>
          <div className="p-3 flex flex-col px-6">
            <h3 className="font-light uppercase text-opacity-50">
              Phone number
            </h3>
            {isEdit ? (
              <p className="text-sm font-bold">{data.phone_number}</p>
            ) : (
              <input
                type="text"
                className="font-bold input input-sm input-bordered w-3/4  rounded-lg bg-transparent"
                value={data.phone_number}
              />
            )}
          </div>
          <div></div>

          <div className="p-3 flex flex-col px-6">
            <h3 className="font-light uppercase text-opacity-50">Birth Date</h3>
            {isEdit ? (
              <p className="text-sm font-bold">{data.birthdate}</p>
            ) : (
              <input
                type="date"
                className="font-bold input input-sm input-bordered w-3/4  rounded-lg bg-transparent"
                value={data.birthdate}
              />
            )}
          </div>
          <div className="p-3 flex flex-col px-6">
            <h3 className="font-light uppercase text-opacity-50">Age</h3>
            {isEdit ? (
              <p className="text-sm font-bold">{data.age}</p>
            ) : (
              <input
                type="text"
                disabled
                className="font-bold input input-sm input-bordered w-3/4  rounded-lg bg-transparent"
                value={data.age}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
