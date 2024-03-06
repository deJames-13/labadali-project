/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  notification: null,
  role: null,
  errors: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
  setErrors: () => {},
});

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, _setRole] = useState(localStorage.getItem("USERTYPE"));
  const [notification, _setNotification] = useState(null);
  const [errors, _setErrors] = useState(null);
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      _setRole(payload.role);
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setNotification = (message, duration, bg) => {
    _setNotification({ message, time: new Date(), bg });
    setTimeout(() => {
      _setNotification(null);
    }, duration ?? 3000);
  };

  const setErrors = (message, duration, bg, position) => {
    _setErrors({ message, time: new Date(), bg, position });
    setTimeout(() => {
      _setErrors(null);
    }, duration ?? 3000);
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        notification,
        role,
        errors,
        setUser,
        setToken,
        setNotification,
        setErrors,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext);
