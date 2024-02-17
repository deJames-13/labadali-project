export default function Profile() {
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
        <h1 className="font-bold uppercase text-left">Personal Information</h1>
        <div className="p-3 flex flex-col space-y-3  text-left">
          <div className="flex items-center justify-between">
            <div className="p-3 flex flex-col ">
              <h3 className="font-light uppercase text-opacity-50">Username</h3>
              <p className="text-sm font-bold">Mirai4chann</p>
            </div>
            <button className="btn btn-sm btn-primary">Edit</button>
          </div>

          <div className="flex items-center justify-between">
            <div className="p-3 flex flex-col ">
              <h3 className="font-light uppercase text-opacity-50">
                Full Name
              </h3>
              <p className="text-sm font-bold">Rizza Saldo Lazaro</p>
            </div>
            <button className="btn btn-sm btn-primary">Edit</button>
          </div>

          <div className="flex items-center justify-between">
            <div className="p-3 flex flex-col ">
              <h3 className="font-light uppercase text-opacity-50">Email</h3>
              <p className="text-sm font-bold">rizza.lazaro@tup.edu.ph</p>
            </div>
            <button className="btn btn-sm btn-primary">Edit</button>
          </div>
        </div>
      </div>
    </>
  );
}
