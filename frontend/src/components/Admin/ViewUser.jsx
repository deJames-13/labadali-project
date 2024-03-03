import Modal from "../Modal";

export default function ViewUser({ ...u }) {
  return (
    <Modal
      id="view-user-modal"
      title={
        <div className="flex items-center space-x-2 text-2xl">
          <i className="fas fa-user"></i>
          <h1 className="text-left w-full font-bold text-xl">
            User Information: ID {u.id}
          </h1>
        </div>
      }
      main={
        <>
          <div className="w-full flex flex-col items-center sm:flex-row sm:space-x-6 sm:items-start">
            <div className="avatar rounded-lg border-2 p-1 border-primary aspect-square w-1/3 shadow-xl">
              <img
                src={u.admin.image_path}
                alt={u.username}
                className="aspect-square w-full"
              />
            </div>

            <div className="w-full grid grid-cols-2 items-center">
              {/* username */}
              <label htmlFor="" className="text-sm font-bold text-gray-700">
                Username:{" "}
              </label>
              <h1 className="text-left w-full">{u.username}</h1>

              {/* Name */}
              <label htmlFor="" className="text-sm font-bold text-gray-700">
                Name:{" "}
              </label>
              <h1 className="text-left w-full font-bold text-xl">
                {u.admin.first_name + " " + u.admin.last_name}
              </h1>

              {/* Email */}
              <label htmlFor="" className="text-sm font-bold text-gray-700">
                Email:{" "}
              </label>
              <h1 className="text-left w-full font-bold text-medium">
                {u.email}
              </h1>
              {/* Phone Number */}
              <label htmlFor="" className="text-sm font-bold text-gray-700">
                Contact:{" "}
              </label>
              <h1 className="text-left w-full text-sm">
                {u.admin.phone_number}
              </h1>
              {/* Position */}
              <label htmlFor="" className="text-sm font-bold text-gray-700">
                Department:{" "}
              </label>
              <h1 className="text-left w-full text-sm">{u.admin.position}</h1>
            </div>
          </div>
          <div className="divider"></div>
        </>
      }
      action={
        <form method="dialog" className="flex justify-end gap-2">
          <button className="btn btn-ghost">Close</button>
          <button className="btn btn-primary ">Edit</button>
        </form>
      }
    />
  );
}
