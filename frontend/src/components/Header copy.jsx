import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="w-full mb-16 animate__animated animate__fadeInDown">
      <div className="container mx-auto p-3 h-full flex justify-between items-center border-b border-cbrown">
        <Logo />
        <div className="nav flex space-x-6 items-center">
          <Link
            to={"/welcome"}
            className="btn btn-ghost text-primary text-xl font-bold uppercase hover:text-cbrown"
          >
            Home
          </Link>

          <Link
            to={"/welcome"}
            className="btn btn-ghost text-cbrown font-medium uppercase hover:font-bold hover:scale-105 transform transition-all"
          >
            About
          </Link>

          <Link
            to={"/welcome"}
            className="btn btn-ghost text-cbrown font-medium uppercase hover:font-bold hover:scale-105 transform transition-all"
          >
            Services
          </Link>

          <Link
            to={"/signup"}
            className="btn btn-secondary text-cbrown font-bold uppercase"
          >
            Book Laundry
          </Link>
        </div>
      </div>
    </header>
  );
}
