import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col space-y-3">
      <div className="relative drop-shadow-xl">
        <h1 className="w-full font-display text-6xl">404 Not Found</h1>
        <h1 className="w-full absolute inset-0 top-0 left-1 text-secondary font-display text-6xl">
          404 Not Found
        </h1>
      </div>
      <Link
        to={"/"}
        className="flex items-center hover:font-bold hover:text-blue-950  hover:ml-2 transition-all ease-in-out  group"
      >
        <i className="group-hover:block fas fa-arrow-right hidden mx-2"></i>
        <span className="group-hover:underline">Go Back to Home Page</span>
      </Link>
    </div>
  );
}
