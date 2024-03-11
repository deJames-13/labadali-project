/* eslint-disable no-unused-vars */
import { useLocation } from "react-router-dom";
import Reports from "../../../components/Admin/Reports/index";
import Charts from "../../../components/charts/index";
export default function ManageReports() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = query.get("page");
  return (
    <div className="min-h-screen flex flex-col space-y-4 bg-secondary bg-opacity-30 p-6 rounded-lg shadow-xl">
      {page === "charts" ? <Charts /> : <Reports />}
    </div>
  );
}
