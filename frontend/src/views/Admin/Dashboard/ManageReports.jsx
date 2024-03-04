import Charts from "../../../components/charts/index";
export default function ManageReports() {
  return (
    <div className="min-h-screen flex flex-col space-y-4 bg-secondary bg-opacity-30 p-6 rounded-lg shadow-xl">
      <div className="flex space-x-2 font-bold text-3xl uppercase">
        <i className="fas fa-file"></i>
        <h1>Reports</h1>
      </div>

      <Charts />
    </div>
  );
}
