/* eslint-disable no-unused-vars */
import { Navigate, createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout.jsx";
import DefaultLayout from "./layouts/DefaultLayout.jsx";
import GuestLayout from "./layouts/GuestLayout.jsx";
// Dashboard
import Dashboard from "./views/Dashboard";
import Booking from "./views/Dashboard/Booking.jsx";
import BookingHistory from "./views/Dashboard/BookingHistory.jsx";
import Message from "./views/Dashboard/Message.jsx";
import Profile from "./views/Dashboard/Profile.jsx";
import Settings from "./views/Dashboard/Settings.jsx";

// ADMIN
import { Message as AdminMessage } from "./components/Admin/Message.jsx";
import { Dashboard as AdminHome } from "./views/Admin/Dashboard/";
import AdminDashboard from "./views/Admin/Dashboard/AdminDashboard.jsx";
import ManageBookings from "./views/Admin/Dashboard/ManageBookings.jsx";
import ManageInventories from "./views/Admin/Dashboard/ManageInventories.jsx";
import ManageUsers from "./views/Admin/Dashboard/ManageUsers.jsx";
import Messages from "./views/Admin/Dashboard/Messages.jsx";

// GUEST
import ManageLaundries from "./views/Admin/Dashboard/ManageLaundries.jsx";
import ManageReports from "./views/Admin/Dashboard/ManageReports.jsx";
import ManageUser from "./views/Admin/Dashboard/ManageUsers.jsx";
import { Login as AdminLogin } from "./views/Admin/Login";
import Login from "./views/Login.jsx";
import NotFound from "./views/NotFound.jsx";
import Signup from "./views/Signup.jsx";
import Welcome from "./views/Welcome.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/welcome" />,
      },
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
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <AdminHome />,
      },
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/manage/bookings",
        element: <ManageBookings />,
      },
      {
        path: "/admin/manage/users",
        element: <ManageUsers />,
      },
      {
        path: "/admin/manage/inventories",
        element: <ManageInventories />,
      },
      {
        path: "/admin/manage/laundries",
        element: <ManageLaundries />,
      },
      {
        path: "/admin/manage/reports",
        element: <ManageReports />,
      },
      {
        path: "/admin/messages",
        element: <Messages />,
      },
      {
        path: "/admin/message/:id",
        element: <AdminMessage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
