import { useLocation } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import Logo from "../Logo";
export default function DashboardTop() {
  const { user } = useStateContext();
  const location = useLocation();
  const page = location.pathname.split("/admin/")[1];
  return (
    <>
      <div className="w-full p-9 bg-primary ">
        <div
          className={`w-full px-3 h-full flex space-x-6 justify-end md:justify-between items-center ${
            page === "dashboard" ? "" : "lg:justify-end"
          }`}
        >
          <Logo
            extendClass={`w-1/3  hidden md:block ${
              page === "dashboard" ? "" : "lg:hidden"
            }`}
            color="text-secondary"
          />

          <div className="w-full nav flex space-x-6 items-center justify-end max-h-24">
            <input
              type="text"
              className="hidden lg:block input input-bordered border-cbrown input-md w-1/3 bg-transparent "
            />

            <div className="text-cbrown font-medium flex space-x-3 items-center">
              <span>
                Hi, Admin &nbsp;
                <span className="text-cpink font-bold">{user.username}</span>
              </span>
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                  <img src="/img/rizza-img" />
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
