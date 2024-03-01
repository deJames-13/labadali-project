/* eslint-disable no-unused-vars */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
  const { token, role } = useStateContext();
  const loc = useLocation();
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log(payload.role == "customer");
    return payload.role == "admin" ? (
      <Navigate to="/admin" />
    ) : (
      <Navigate to="/dashboard" />
    );
  }

  return (
    <>
      {loc.pathname.split("/")[1] !== "admin" && <Header />}
      <Outlet />
    </>
  );
}
