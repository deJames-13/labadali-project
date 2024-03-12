/* eslint-disable no-unused-vars */
import { format } from "date-fns";
import PropTypes from "prop-types";
export default function YearlyRevenueTable({ bookings }) {
  let revenueInYear = 0;
  let months;
  try {
    months = Object.keys(bookings);
  } catch (error) {
    return;
  }
  return (
    <>
      <div className="overflow-x-auto print:min-w-a4 print:w-full print:max-w-a4">
        {months &&
          months.map((m, i) => {
            const mbookings =
              bookings[m].bookings && bookings[m].bookings.length > 0
                ? bookings[m].bookings
                : null;

            revenueInYear += bookings[m].revenue;

            return (
              <div key={i}>
                <h2 className="font-bold text-lg uppercase mt-6">{m}</h2>
                <table className="table table-xs table-zebra w-full table-fixed">
                  <thead className="border-y-2">
                    <tr>
                      <th className="print:pt-6 w-2/12 text-center">
                        Booking ID
                      </th>
                      <th className="print:pt-6 w-2/12 text-center">
                        Total Price
                      </th>
                      <th className="print:pt-6 w-6/12">Items Used</th>
                      <th className="print:pt-6 w-3/12 text-center">
                        Booking Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mbookings &&
                      mbookings.map((b, j) => {
                        return (
                          <tr key={j}>
                            <td className="print:pt-6 w-1/12 text-center">
                              {b.booking_id}
                            </td>
                            <td className="print:pt-6 w-2/12 text-center">
                              {b.total_price}
                            </td>
                            <td className="print:pt-6 w-6/12">
                              {b.items_used.map((itm, l) => {
                                return (
                                  <table
                                    key={l}
                                    className="mb-2  table table-xs table-zebra w-full table-fixed"
                                  >
                                    <thead>
                                      <tr>
                                        <th className="w-1/4 whitespace-normal">
                                          Name
                                        </th>
                                        <th className="w-1/4 whitespace-normal">
                                          Qty Used
                                        </th>
                                        <th className="w-1/4 whitespace-normal">
                                          Item Cost
                                        </th>
                                        <th className="w-1/4 whitespace-normal">
                                          Item Total
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="border-b-2">
                                      <tr>
                                        <td className="w-1/4 whitespace-normal">
                                          {itm.name}
                                        </td>
                                        <td className="w-1/4 whitespace-normal">
                                          {itm.quantity_used}
                                        </td>
                                        <td className="w-1/4 whitespace-normal">
                                          {itm.cost_per_stock}
                                        </td>
                                        <td className="w-1/4 whitespace-normal">
                                          {itm.stock_cost}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                );
                              })}
                            </td>
                            <td className="print:pt-6 w-3/12 text-center">
                              {b.booking_date}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <div className="w-full grid place-items-end">
                  <div className="w-2/3 grid grid-cols-2 gap-1 place-content-end px-6">
                    <h3 className="font-bold text-lg uppercase">
                      Booking Total:
                    </h3>
                    <h3 className="font-bold text-lg uppercase">
                      P {bookings[m].monthtotal}
                    </h3>
                    <h3 className="font-bold text-lg uppercase">Item Total:</h3>
                    <h3 className="font-bold text-lg uppercase">
                      P {bookings[m].itemtotalinmonth}
                    </h3>
                    <div className="divider col-span-2 m-0 p-0 h-1"></div>

                    <h3 className="font-bold text-lg uppercase">Revenue:</h3>
                    <h3 className="font-bold text-lg uppercase">
                      P {bookings[m].revenue}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}

        <div className="divider my-12">
          <h3 className="font-bold text-lg uppercase">Revenue In Year:</h3>
          <h3 className="font-bold text-lg uppercase">P {revenueInYear}</h3>
        </div>
      </div>
    </>
  );
}

// proptypes
YearlyRevenueTable.propTypes = {
  bookings: PropTypes.any.isRequired,
};
