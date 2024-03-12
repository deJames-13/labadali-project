import { format } from "date-fns";
import PropTypes from "prop-types";

export default function MonthlyBookingsTable({ bookings }) {
  const totalRevenue = bookings.reduce((acc, booking) => {
    return acc + parseFloat(booking.total_price);
  }, 0);
  return (
    <div className="overflow-x-auto  print:min-w-a4 print:w-full print:max-w-a4">
      <table className="table table-xs table-zebra ">
        <thead className="border-y-2">
          <tr>
            <th className="print:pt-6 w-1/12"></th>
            <th className="print:pt-6 w-2/12">Customer</th>
            <th className="print:pt-6 w-8/12">Laundries</th>
            <th className="print:pt-6 w-1/12">Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => (
            <tr key={i}>
              <td className="w-1/12">
                <strong>{b.id}</strong>
              </td>
              <td className="w-2/12">
                <span>
                  {b.customer.first_name} {b.customer.last_name}
                </span>
                <br />
                <span>{b.customer.phone_number}</span>
              </td>
              <td className="w-5/12 print:pb-6">
                <table className="w-full table-fixed">
                  <thead>
                    <tr>
                      <th className="w-1/4 whitespace-normal">Name</th>
                      <th className="w-1/4 whitespace-normal">Quantity</th>
                      <th className="w-1/4 whitespace-normal">Kilo</th>
                      <th className="w-1/4 whitespace-normal">Item Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {b.laundries.map((laundry, index) => (
                      <tr key={index}>
                        <td className="w-1/4 whitespace-normal">
                          {laundry.title}
                        </td>
                        <td className="w-1/4 whitespace-normal">
                          {laundry.price}
                        </td>
                        <td className="w-1/4 whitespace-normal">
                          {laundry.quantity}Kg
                        </td>
                        <td className="w-1/4 whitespace-normal">
                          {laundry.item_total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t-2">
                    <tr>
                      <th
                        colSpan="3"
                        className="w-3/4 font-bold text-black whitespace-normal "
                      >
                        Total
                      </th>
                      <th className="w-1/4 font-bold text-black whitespace-normal">
                        {b.total_price}
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </td>
              <td className="w-4/12">
                {format(new Date(b.created_at), "yyyy-MM-dd")}
              </td>
            </tr>
          ))}
          <tr>
            <th
              colSpan="4"
              className="font-bold text-3xl text-black text-right px-24"
            >
              <div className="border-t-2 border-black w-full mb-4"></div>
              <span>Total: </span>
              <span className="ml-6">{totalRevenue}</span>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// proptypes
MonthlyBookingsTable.propTypes = {
  bookings: PropTypes.array.isRequired,
};
