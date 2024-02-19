/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
export default function AdminLayout() {
  const { user, token, setUser } = useStateContext();
  if (!token) {
    return <Navigate to={"/admin/login"} />;
  }
  useEffect(() => {
    axiosClient
      .get("/user")
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setUser]);
  return (
    <div>
      admin
      <Outlet />
    </div>
  );
}
