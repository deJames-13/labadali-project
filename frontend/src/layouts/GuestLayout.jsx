import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
  const { token } = useStateContext();
  const loc = useLocation();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {loc.pathname.split("/")[1] !== "admin" && <Header />}
      <Outlet />
    </>
  );
}
