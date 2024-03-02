/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
  const { setUser, setToken, setNotification } = useStateContext();
  const [errors, setErrors] = useState(null);
  const username = useRef();
  const password = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      username: username.current.value,
      password: password.current.value,
    };
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((error) => {
        const e = error.response;
        if (e && e.status === 422) {
          setErrors(e.data.errors);
        }
      });
  };

  return (
    <>
      <main className="py-8 w-full grid place-items-center">
        <div className="p-4 lg:w-3/4 flex flex-col justify-center items-center space-y-3">
          <h1 className="text-4xl font-extrabold tracking-wider text-cbrown text-center uppercase">
            LOG IN
          </h1>

          <span className="lg:w-1/2 text-xl font-bold text-textSecondary text-center">
            Hi! Welcome back, you&apos;ve been missed
          </span>

          <form
            onSubmit={onSubmit}
            className="py-3 w-full flex flex-col justify-center items-center space-y-6"
          >
            {errors && (
              <div role="alert" className="alert">
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            )}

            <input
              ref={username}
              name="username"
              id="username"
              type="text"
              className="input bg-inputBg w-full max-w-xl rounded-sm"
              placeholder="Username "
            />

            <input
              ref={password}
              name="password"
              id="password"
              type="password"
              className="input bg-inputBg w-full max-w-xl rounded-sm"
              placeholder="Password"
            />

            <a
              href="#"
              className="w-full max-w-xl text-right text-textSecondary font-medium underline"
            >
              Forgot Password?
            </a>

            <input
              type="submit"
              value="Sign In"
              className="btn btn-secondary w-full max-w-xs uppercase text-xl font-bold"
            />

            <span className="text-textSecondary">Or sign up with</span>

            <span className="text-4xl border border-cbrown aspect-square flex items-center justify-center rounded-full">
              <i className="bx bxl-facebook-circle"></i>
            </span>

            <span className="text-cbrown font-medium">
              Doesn&apos;t have an account? &nbsp;
              <span className="text-textSecondary font-medium underline">
                <Link to={"/signup"}>Sign up here.</Link>
              </span>
            </span>
          </form>
        </div>
      </main>
    </>
  );
}
