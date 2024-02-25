export default function Table() {
  return (
    <div className="overflow-x-auto h-1/2 rounded-lg shadow-lg p-1 lg:p-6 bg-secondary bg-opacity-20">
      <table className="table table-xs table-pin-rows table-pin-cols">
        <thead className="border-b-2 border-cbrown uppercase">
          <tr className="">
            <th></th>
            <td>Name</td>
            <td>Job</td>
            <td>Company</td>
            <td>location</td>
            <td>Last Login</td>
            <td>Favorite Color</td>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Littel, Schaden and Vandervort</td>
            <td>Canada</td>
            <td>12/16/2020</td>
            <td>Blue</td>
            <th>
              <button className="btn btn-primary btn-xs">
                <i className="fas fa-pen"></i>
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
