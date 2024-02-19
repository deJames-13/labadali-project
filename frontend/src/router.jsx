/* eslint-disable no-unused-vars */
import { Navigate, createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout.jsx";
import DefaultLayout from "./layouts/DefaultLayout.jsx";
import GuestLayout from "./layouts/GuestLayout.jsx";
// Dashboard
import Dashboard from "./views/Dashboard";
import Booking from "./views/Dashboard/Booking.jsx";
import BookingHistory from "./views/Dashboard/BookingHistory.jsx";
import BookingStatus from "./views/Dashboard/BookingStatus.jsx";
import Message from "./views/Dashboard/Message.jsx";
import Profile from "./views/Dashboard/Profile.jsx";
import Settings from "./views/Dashboard/Settings.jsx";

import { Login as AdminLogin } from "./views/Admin/Login";
import Login from "./views/Login.jsx";
import NotFound from "./views/NotFound.jsx";
import Signup from "./views/Signup.jsx";
import Welcome from "./views/Welcome.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "/booking",
        element: <Booking />,
      },
      {
        path: "/status",
        element: <BookingStatus />,
      },
      {
        path: "/history",
        element: <BookingHistory />,
      },
      {
        path: "/message",
        element: <Message />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/welcome",
        element: <Welcome />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/admin/login",
        element: <AdminLogin />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
