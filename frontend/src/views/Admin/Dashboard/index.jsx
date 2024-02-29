import { Link } from "react-router-dom";
export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col space-y-6">
      {/* Banner */}
      <div className="relative drop-shadow-lg text-center">
        <h1 className="text-2xl md:text-6xl font-extrabold uppercase tracking-wider">
          Welcome to{" "}
          <span className="text-3xl md:text-7xl font-bobbyjones text-primary uppercase">
            labadali!
          </span>
        </h1>

        <h1 className="absolute inset-0 -z-1 left-1 text-2xl text-secondary md:text-6xl font-extrabold uppercase tracking-wider">
          Welcome to{" "}
          <span className="text-3xl md:text-7xl font-bobbyjones text-secondary uppercase">
            labadali!
          </span>
        </h1>
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

            <Link
              to="/admin/manage/bookings"
              className="link link-cbrown hover:text-primary link-hover"
            >
              <i className="fas fa-book p-2"></i>
              Bookings
            </Link>
            <Link
              to="/admin/manage/laundries"
              className="link link-cbrown hover:text-primary link-hover"
            >
              <i className="fas fa-boxes p-2"></i>
              Laundries
            </Link>
            <Link
              to="/admin/manage/users"
              className="link link-cbrown hover:text-primary link-hover"
            >
              <i className="fas fa-users p-2"></i>
              Users
            </Link>
          </div>

          <div className="flex flex-col space-y-1">
            <h2 className="w-full text-secondary font-bold uppercase">
              More Actions
            </h2>

            <Link
              to="/admin/"
              className="link link-cbrown hover:text-primary link-hover"
            >
              <i className="fas fa-user p-2"></i>
              Profile
            </Link>
            <Link
              to="/admin/"
              className="link link-cbrown hover:text-primary link-hover"
            >
              <i className="fas fa-gear p-2"></i>
              Setting
            </Link>
            <Link
              to="/admin/"
              className="link link-cbrown hover:text-primary link-hover"
            >
              <i className="fas fa-arrow-right-from-bracket p-2"></i>
              Logout
            </Link>
          </div>
        </div>
      </div>
      {/* Recents */}
    </div>
  );
}
