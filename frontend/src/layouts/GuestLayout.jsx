/* eslint-disable no-unused-vars */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Alert from "../components/Alert";
import Header from "../components/Header";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
  const { token, notification } = useStateContext();
  const loc = useLocation();
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));

    return payload.role == "admin" ? (
      <Navigate to="/admin" />
    ) : (
      <Navigate to="/dashboard" />
    );
  }
  return (
    <div>
      {notification && <Alert alert={notification} />}
      {loc.pathname.split("/")[1] !== "admin" && <Header />}
      <Outlet />
    </div>
  );
}
