export function Login() {
  return (
    <main className="relative min-h-screen grid place-items-center overflow-hidden">
      <img
        src="/img/s3.webp"
        alt=""
        className="absolute -top-1/3 w-full -z-10"
      />

      <div className="z-10 my-12 p-6 shadow-[20px_20px_50px_0px_#1a202caa] rounded-lg flex flex-col justify-center items-center space-y-3">
        <div className="logo flex space-x-2 items-center">
          <img
            className="w-20 inline-block"
            src="/img/logo-icon-transparent.png"
            alt=""
          />
          <span className="text-6xl uppercase text-primary font-bobbyjones">
            labadali
          </span>
        </div>
        <div className="divider"></div>
        <h1 className="text-xl font-extrabold tracking-wider text-cbrown text-center uppercase">
          Don&apos;t have an account yet?
        </h1>

        <span className="w-3/4 text-md font-light text-textSecondary text-center">
          Contact us at{" "}
          <span className="text-secondary underline">
            <a href="#">labadali.com</a>
          </span>{" "}
          and we will take care of everything!!
        </span>
        <h1 className="text-4xl font-extrabold tracking-wider text-cbrown text-center uppercase">
          LOG IN
        </h1>
        <span className="w-3/4 text-md font-light text-textSecondary text-center">
          Login with your admin credentials.
        </span>
        <form
          action="userdash.html"
          className="py-3 w-full flex flex-col justify-center items-center space-y-6"
        >
          <input
            name="email"
            id="email"
            type="email"
            className="input bg-inputBg w-full max-w-xl rounded-sm"
            placeholder="Email "
          />

          <input
            name="password"
            id="password"
            type="password"
            className="input bg-inputBg w-full max-w-xl rounded-sm"
            placeholder="Password"
          />

          <a
            href="#"
            className="w-full max-w-xl text-center text-textSecondary font-medium underline"
          >
            Forgot Password?
          </a>

          <input
            type="submit"
            value="Log In"
            className="btn btn-secondary w-full max-w-xs uppercase text-xl font-bold"
          />
        </form>
      </div>
    </main>
  );
}
