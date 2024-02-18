import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div className={`min-h-screen flex flex-col space-y-6 items-center p-6`}>
      <div className="relative w-full text-center drop-shadow-lg animate__animated animate__bounceIn animate__delay-1s ">
        <h1 className="font-display text-primary text-3xl  md:text-6xl  uppercase tracking-wider">
          Welcome to Labadali!
        </h1>

        <h1 className="hidden absolute inset-0 left-2 -z-1 lg:flex items-center justify-center font-display text-secondary text-6xl uppercase tracking-wider">
          Welcome to Labadali!
        </h1>
      </div>
      <div className="w-full p-3 flex justify-center items-center flex-col space-y-6 lg:space-y-0 lg:flex-row lg:space-x-16">
        <Link
          to={"/profile"}
          className="animate__animated animate__flipInY animate__fast aspect-square w-full max-w-sm lg:w-1/3 p-6 flex flex-col space-y-3 justify-center items-center rounded-xl border border-cbrown hover:bg-secondary hover:bg-opacity-40 hover:scale-90 hover:border-b-4  transition-all ease-in-out"
        >
          <div className="w-2/3 text-secondary text-center">
            <img
              src="img/set-up-profile.webp"
              alt="set-up-your-profile"
              className="avatar "
            />
          </div>
          <div className="h-1/3 flex flex-col items-center">
            <span className="text-xl font-bold">Set up your profile!</span>
            <span className="text-sm font-bold text-gray-400 text-center">
              Tell us something about you by providing basic information!
            </span>
          </div>
        </Link>
        <Link
          to={"/booking"}
          className="animate__animated animate__flipInY animate__delay-1s animate__fast aspect-square w-full max-w-sm lg:w-1/3 p-12 flex flex-col space-y-3 justify-center items-center rounded-xl border border-cbrown hover:bg-secondary hover:bg-opacity-40 hover:border-b-4 hover:scale-110 transition-all ease-in-out"
        >
          <div className="w-2/3 text-secondary text-center">
            <img
              src="img/book-now.webp"
              alt="book-laundry-now"
              className="avatar "
            />
          </div>
          <div className="h-1/3 flex flex-col items-center">
            <span className="text-xl font-bold">Book your laundry now!</span>
            <span className="text-sm font-bold text-gray-400 text-center">
              Schedule a pick-up and delivery time for your laundry!
            </span>
          </div>
        </Link>
        <div className="animate__animated animate__flipInY animate__delay-2s animate__fast aspect-square w-full max-w-sm lg:w-1/3 p-12 flex flex-col space-y-3 justify-center items-center rounded-xl border border-cbrown hover:bg-secondary hover:bg-opacity-40 hover:border-b-4 hover:scale-110 transition-all ease-in-out">
          <div className="w-2/3 text-secondary text-center">
            <img
              src="img/contact-us.webp"
              alt="contact-us"
              className="avatar "
            />
          </div>
          <div className="h-1/3 flex flex-col items-center">
            <span className="text-xl font-bold">Set up your profile!</span>
            <span className="text-sm font-bold text-gray-400 text-center">
              Tell us something about you by providing basic information!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
