/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import axiosClient from "../axios-client";
import DashboardTop from "../components/Admin/DashboardTop";
import Sidebar from "../components/Admin/Sidebar";
import { useStateContext } from "../contexts/ContextProvider";

export default function AdminLayout() {
  const { user, token, setUser, setToken } = useStateContext();
  const location = useLocation();
  const page = location.pathname.split("/admin/")[1];

  if (!token) {
    return <Navigate to={"/admin/login"} />;
  }
  const payload = JSON.parse(atob(token.split(".")[1]));
  if (payload.role != "admin") {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    axiosClient
      .get("/user?_role=admin")
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setUser]);

  const onLogout = (e) => {
    e.preventDefault();
    axiosClient
      .post("/logout")
      .then(() => {
        setUser({}), setToken(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return user ? (
    <div id="defaultLayout">
      <div
        className={`max-h-screen overflow-auto drawer ${
          page === "dashboard" ? "" : "lg:drawer-open"
        }`}
      >
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center ">
          <DashboardTop />

          <div className="main-section w-full p-6 lg:p-12">
            <Outlet />
          </div>
        </div>

        <Sidebar page={page} onLogout={onLogout} />
      </div>
    </div>
  ) : (
    <div className="min-w-screen h-screen flex items-center justify-center space-x-3 bg-primary bg-opacity-40 ">
      <span className="font-bold animate-pulse">Please wait</span>
      <span className="loading loading-dots loading-sm"></span>
    </div>
  );
}
