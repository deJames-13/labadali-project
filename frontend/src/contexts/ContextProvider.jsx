import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  notification: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
});

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [notification, _setNotification] = useState(null);
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setNotification = (message) => {
    _setNotification({ message, time: new Date() });
    setTimeout(() => {
      _setNotification(null);
    }, 5000);
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        notification,
        setUser,
        setToken,
        setNotification,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext);
