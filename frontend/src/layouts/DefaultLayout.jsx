/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import axiosClient from "../axios-client";
import DashboardTop from "../components/DashboardTop";
import Sidebar from "../components/Sidebar";
import { useStateContext } from "../contexts/ContextProvider";
import Dashboard from "../views/Dashboard/index";

export default function DefaultLayout() {
  const { user, token, notification, setUser, setToken, setNotification } =
    useStateContext();
  const location = useLocation();
  const page = location.pathname.split("/")[1];
  if (!token) {
    return <Navigate to="/login" />;
  }
  const payload = JSON.parse(atob(token.split(".")[1]));
  if (payload.role != "customer") {
    return <Navigate to="/login" />;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    axiosClient
      .get("/user?_role=customer")
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
      .then(({ data }) => {
        setToken(null);
        setUser({});
        setNotification("Logged out successfully!", 3000, "primary");
        return <Navigate to="/login" />;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return user ? (
    <div id="defaultLayout">
      {notification && (
        <>
          <div className="z-10 toast">
            {notification.message.split("\n").map((m, i) => (
              <div key={i} className={`alert bg-${notification.bg}`}>
                <span>{m}</span>
              </div>
            ))}
          </div>
        </>
      )}
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
