/* eslint-disable no-unused-vars */
import { Navigate, Outlet, useLocation } from "react-router-dom";
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
    <>
      {notification && (
        <>
          <div className="toast z-10">
            {notification.message.split("\n").map((m, i) => (
              <>
                <div
                  key={i}
                  className={`alert bg-${notification.bg} animate__animated animate__fadeInRight`}
                >
                  <span>{m}</span>
                </div>
              </>
            ))}
          </div>
        </>
      )}
      {loc.pathname.split("/")[1] !== "admin" && <Header />}
      <Outlet />
    </>
  );
}
