import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <main className="mx-auto flex space-x-3">
      <div className="left-hero w-full relative  flex flex-col space-y-5 px-24">
        <div className="w-full relative animate__animated animate__bounceIn">
          <h1 className="w-full z-2 font-display text-8xl text-secondary tracking-wider drop-shadow-xl">
            WE DO LAUNDRY FOR YOU
          </h1>
          <h1 className="w-full absolute top-0 right-1 font-display text-8xl text-primary tracking-wider ">
            WE DO LAUNDRY FOR YOU
          </h1>
        </div>
        <p className="text-cbrown font-medium text-lg ">
          Labadali: Laundry Made Easy, Speed Redefined!
        </p>
        <Link
          to={"/signup"}
          className="max-w-xs btn btn-secondary uppercase text-white text-2xl font-bold tracking-wide drop-shadow-lg  animate-bounce"
        >
          Get Started
        </Link>

        <img
          className="absolute -z-10 -top-16 right-8 animate__animated animate__fadeIn"
          src="img/bubble-transparent.png"
          alt="bubble-transparent"
        />
      </div>

      <div className="w-full flex flex-col px-8 animate__animated animate__fadeInRight">
        <img className="max-w-full" src="img/right-hero-img.png" alt="" />
      </div>
    </main>
  );
}
