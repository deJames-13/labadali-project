import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

export default function Header() {
  const location = useLocation();
  return (
    <header className="w-full mb-16 animate__animated animate__fadeInDown border-b-2 border-cbrown px-6">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={"/welcome"}>Home</Link>
            </li>
            <li>
              <Link to={"/welcome"}>About</Link>
            </li>
            <li>
              <Link to={"/welcome"}>Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown lg:hidden">
            <div
              tabIndex="0"
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <i className="fas fa-bars"></i>
            </div>
            <ul
              tabIndex="0"
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/welcome"}>Home</Link>
              </li>
              <li>
                <Link to={"/welcome"}>About</Link>
              </li>
              <li>
                <Link to={"/welcome"}>Contact Us</Link>
              </li>
            </ul>
          </div>

          {location.pathname.split("/")[1] === "signup" ? (
            <Link
              to={"/login"}
              className="btn btn-secondary px-6 text-md font-bold"
            >
              Login
            </Link>
          ) : (
            <Link
              to={"/signup"}
              className="btn btn-secondary px-6 text-md font-bold"
            >
              Join Us
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
