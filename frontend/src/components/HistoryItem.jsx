/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useState } from "react";
import BookingItem from "./BookingItem";

export default function HistoryItem({
  bookingNumber,
  datePlaced,
  totalAmount,
  laundriesData = [],
}) {
  const [showLaundries, setShowLaundries] = useState(false);

  const handleShowLaundries = (e) => {
    e.preventDefault();
    setShowLaundries(!showLaundries);
  };

  return (
    <>
      {/* Order Info Card */}
      <div className="bg-secondary bg-opacity-20  p-3 rounded-lg border border-cbrown hover:bg-opacity-30 ease-in-out transition-all">
        <div className="w-full flex flex-col space-y-6  items-center lg:space-y-0 lg:flex-row lg:justify-between">
          <div className="flex space-x-6 text-center">
            <div className="flex flex-col space-y-1">
              <h2 className="font-bold ">Booking No.</h2>
              <p className="font-medium text-sm">{bookingNumber}</p>
            </div>

            <div className="flex flex-col space-y-1">
              <h2 className="font-bold ">Date Placed</h2>
              <p className="font-medium text-sm">{datePlaced}</p>
            </div>

            <div className="flex flex-col space-y-1">
              <h2 className="font-bold ">Total </h2>
              <p className="font-medium text-sm">₱ {totalAmount}</p>
            </div>
          </div>
          <div className="flex flex-row space-x-3 ">
            <button
              onClick={handleShowLaundries}
              className="btn btn-sm btn-primary px-3"
            >
              View Laudries
            </button>
            <button className="btn btn-sm btn-primary px-3">Summary</button>
          </div>
        </div>
        {showLaundries && (
          <>
            <div className="divider"></div>
            <div className="flex flex-col space-y-3">
              {laundriesData.length > 0 &&
                laundriesData.map((laundry) => {
                  return (
                    <BookingItem
                      key={laundry.id}
                      id={laundry.id}
                      title={laundry.title}
                      price={parseFloat(laundry.price)}
                      qty={laundry.quantity}
                      description={laundry.description}
                      laundries={laundriesData}
                      isHistory={true}
                    />
                  );
                })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

HistoryItem.propTypes = {
  bookingNumber: PropTypes.string,
  datePlaced: PropTypes.string,
  totalAmount: PropTypes.number,
  laundriesData: PropTypes.array,
};
