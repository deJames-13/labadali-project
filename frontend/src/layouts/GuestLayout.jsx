import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
