/* eslint-disable no-unused-vars */
import { Link, Navigate } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../contexts/ContextProvider";
export function Dashboard() {
  const { user, token, setUser, setToken, notification, setNotification } =
    useStateContext();
  const onLogout = (e) => {
    e.preventDefault();
    axiosClient
      .post("/logout")
      .then(() => {
        setToken(null);
        setUser({});
        setNotification("Logged out successfully!", 3000, "primary");
        return <Navigate to="/admin/login" />;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-full my-12 flex flex-col items-center justify-center space-y-12">
      {/* Banner */}
      <div className="w-full">
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
      </div>
      {/* Quick Links */}
      <div className="w-full flex flex-col space-y-12 lg:space-y-0 lg:flex-row lg:space-x-3 p-6 bg-primary bg-opacity-25 rounded-lg shadow-md">
        <div className="w-full flex flex-col space-y-2 items-center justify-center">
          <h1 className="w-full max-w-xs text-xl font-extrabold uppercase  text-center lg:text-left">
            Get Started
          </h1>
          <Link
            to="/admin/dashboard"
            className="w-full max-w-xs btn btn-secondary rounded-lg px-4 "
          >
            View Dashboard
          </Link>
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
              to="/admin/manage/reports"
              className="link link-cbrown hover:text-primary link-hover"
            >
              <i className="fas fa-user p-2"></i>
              Charts
            </Link>
            <Link
              to="/admin/mesages"
              className="link link-cbrown hover:text-primary link-hover"
            >
              <i className="fas fa-message p-2"></i>
              Messages
            </Link>
            <button
              onClick={onLogout}
              className="text-left link link-cbrown hover:text-primary link-hover hover:ml-4 transition-all ease-in-out duration-300"
            >
              <i className="fas fa-arrow-right-from-bracket p-2"></i>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
