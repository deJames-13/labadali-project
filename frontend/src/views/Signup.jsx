import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const password_confirmation = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
      password_confirmation: password_confirmation.current.value,
    };
    axiosClient
      .post("/signup", payload)
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
      <main className="py-12 mb-[100px] w-full grid place-items-center">
        <div className="p-6 lg:w-3/4 flex flex-col justify-center items-center space-y-3">
          <h1 className="text-4xl font-extrabold tracking-wider text-cbrown text-center uppercase">
            Create Account
          </h1>

          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}

          <span className="lg:w-1/2 text-xl font-bold text-textSecondary text-center">
            Fill your information below or register with your social account.
          </span>

          <form
            onSubmit={onSubmit}
            className="py-3 w-full flex flex-col justify-center items-center space-y-6"
          >
            <input
              ref={username}
              name="username"
              id="username"
              type="text"
              className="input bg-inputBg w-full max-w-xl rounded-sm"
              placeholder="Username"
            />

            <input
              ref={email}
              name="email"
              id="email"
              type="email"
              className="input bg-inputBg w-full max-w-xl rounded-sm"
              placeholder="Email "
            />

            <input
              ref={password}
              name="password"
              id="password"
              type="password"
              className="input bg-inputBg w-full max-w-xl rounded-sm"
              placeholder="Password"
            />
            <input
              ref={password_confirmation}
              name="password_confirmation"
              id="password_confirmation"
              type="password"
              className="input bg-inputBg w-full max-w-xl rounded-sm"
              placeholder="Confirm Password"
            />

            <div className="policy flex items-center space-x-3">
              <input
                type="checkbox"
                name="policy"
                id="policy"
                className="checkbox checkbox-secondary"
              />
              <span className="text-cbrown font-medium">
                Agree with
                <span className="text-textSecondary font-medium underline">
                  terms and conditions
                </span>
              </span>
            </div>

            <input
              type="submit"
              value="Submit"
              className="btn btn-secondary w-full max-w-xs uppercase text-xl font-bold"
            />

            <span className="text-textSecondary underline">
              Or sign up with{" "}
            </span>

            <span className="text-4xl border border-cbrown aspect-square flex items-center justify-center rounded-full">
              <i className="fab fa-facebook"></i>
            </span>

            <span className="text-cbrown font-medium">
              Already have an account? &nbsp;
              <span className="text-textSecondary font-medium underline">
                <Link to={"/login"}>Login here.</Link>
              </span>
            </span>
          </form>
        </div>
      </main>
    </>
  );
}
