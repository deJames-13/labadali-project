export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col space-y-6">
      {/* Banner */}
      <div>
        <h1 className="text-2xl md:text-6xl font-extrabold uppercase tracking-wider">
          Welcome to{" "}
          <span className="text-3xl md:text-7xl font-bobbyjones text-primary uppercase">
            labadali!
          </span>
        </h1>
        <p className="lg:text-xl text-gray-500 font-bold px-2">
          We’ve assembled the link to get you started
        </p>
      </div>
      {/* Quick Links */}
      <div className="flex flex-col space-y-12 lg:space-y-0 lg:flex-row lg:space-x-3 p-6 bg-primary bg-opacity-25 rounded-lg shadow-md">
        <div className="w-full flex flex-col space-y-2 items-center justify-center">
          <h1 className="w-full max-w-xs text-xl font-extrabold uppercase  text-center lg:text-left">
            Get Started
          </h1>
          <a
            href="#"
            className="w-full max-w-xs btn btn-secondary rounded-lg px-4 "
          >
            View Profile
          </a>
        </div>

        <div className="w-full flex justify-around text-left">
          <div className="flex flex-col space-y-1">
            <h2 className="w-full text-secondary font-bold uppercase">
              Manage Services
            </h2>

            <a
              href=""
              className="link link-cbrown hover:text-primary link-hover"
            >
              <i className="fas fa-book p-2"></i>
              Bookings
            </a>
            <a
              href=""
              className="link link-cbrown hover:text-primary link-hover"
            >
              <i className="fas fa-boxes p-2"></i>
              Inventories
            </a>
            <a
              href=""
              className="link link-cbrown hover:text-primary link-hover"
            >
              <i className="fas fa-users p-2"></i>
              Users
            </a>
          </div>

          <div className="flex flex-col space-y-1">
            <h2 className="w-full text-secondary font-bold uppercase">
              More Actions
            </h2>

            <a
              href=""
              className="link link-cbrown hover:text-primary link-hover"
            >
              <i className="fas fa-user p-2"></i>
              Profile
            </a>
            <a
              href=""
              className="link link-cbrown hover:text-primary link-hover"
            >
              <i className="fas fa-gear p-2"></i>
              Setting
            </a>
            <a
              href=""
              className="link link-cbrown hover:text-primary link-hover"
            >
              <i className="fas fa-arrow-right-from-bracket p-2"></i>
              Logout
            </a>
          </div>
        </div>
      </div>
      {/* Recents */}
    </div>
  );
}
