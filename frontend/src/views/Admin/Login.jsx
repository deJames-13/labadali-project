/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";

export function Login() {
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);
  const email = useRef();
  const password = useRef();
  const username = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
      role: "admin",
    };
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        return <Navigate to="/admin" />;
      })
      .catch((error) => {
        const e = error.response;
        if (e && e.status === 422) {
          setErrors(e.data.errors);
        }
      });
  };

  return (
    <main className="relative min-h-screen grid place-items-center overflow-hidden">
      <img
        src="/img/s3.webp"
        alt=""
        className="absolute -top-1/3 w-full -z-10"
      />

      <div className="z-10 bg-white my-12 p-6 shadow-[20px_20px_50px_0px_#1a202caa] rounded-lg flex flex-col justify-center items-center space-y-3">
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
        <div className="py-3 w-full flex flex-col justify-center items-center space-y-6">
          <input
            ref={username}
            name="username"
            id="username"
            type="username"
            className="input input-primary bg-primary bg-opacity-30 w-full max-w-xl rounded-sm"
            placeholder="Username"
          />
          <input
            ref={password}
            name="password"
            id="password"
            type="password"
            className="input input-primary bg-primary bg-opacity-30 w-full max-w-xl rounded-sm"
            placeholder="Password"
          />

          <input
            ref={email}
            name="email"
            id="email"
            type="email"
            className="input input-primary bg-primary bg-opacity-30 w-full max-w-xl rounded-sm"
            placeholder="Email"
          />

          <a
            href="#"
            className="w-full max-w-xl text-center text-textSecondary font-medium underline"
          >
            Forgot Password?
          </a>

          <button onClick={onSubmit} className="btn btn-secondary ">
            Log In
          </button>
        </div>
      </div>
    </main>
  );
}
