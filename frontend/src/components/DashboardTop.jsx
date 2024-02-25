import { useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Logo from "./Logo";
export default function DashboardTop() {
  const { user } = useStateContext();
  const location = useLocation();
  const page = location.pathname.split("/")[1];
  return (
    <>
      <div className="w-full p-9 bg-primary ">
        <div
          className={`w-full px-3 h-full flex justify-end md:justify-between items-center ${
            page === "dashboard" ? "" : "lg:justify-end"
          }`}
        >
          <Logo
            extendClass={`hidden md:block ${
              page === "dashboard" ? "" : "lg:hidden"
            }`}
            color="text-secondary"
          />

          <div className="nav flex space-x-6 items-center max-h-24">
            <div className="text-cbrown font-medium flex space-x-3 items-center">
              <span>
                Hi, &nbsp;
                <span className="text-cpink font-bold">{user.username}</span>
              </span>
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                  <img src="/img/nouser.jpeg" />
                </div>
              </div>
            </div>
            <label
              htmlFor="my-drawer-2"
              className={`btn btn-primary drawer-button ${
                page === "dashboard" ? "" : "lg:hidden"
              }`}
            >
              <i className="fa-solid fa-bars"></i>
              Menu
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
