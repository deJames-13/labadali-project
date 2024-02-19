import PropTypes from "prop-types";
import BookingItem from "./BookingItem";
export default function BookingSelection({ selected }) {
  return (
    <>
      <div className="flex justify-between items-center w-full text-center bg-secondary">
        <span className="w-full text-lg font-bold uppercase">Services</span>
        <span className="hidden lg:block w-full text-lg font-bold uppercase">
          Qty
        </span>
        <span className="hidden lg:block w-full text-lg font-bold uppercase">
          Price
        </span>
      </div>

      {/* Lists of Laundries */}
      <div className="transition-all flex flex-col space-y-3">
        {selected.length > 0 &&
          selected.map((laundry) => {
            return (
              <BookingItem
                key={laundry.id}
                id={laundry.id}
                title={laundry.title}
                price={parseFloat(laundry.price)}
                description={laundry.description}
                selected={selected}
              />
            );
          })}
      </div>

      <div className="px-12 py-8 w-full flex flex-col justify-center items-center gap-3 lg:flex-row">
        <button
          onClick={() => document.getElementById("bookingItemList").showModal()}
          className="btn btn-outline btn-primary rounded-lg text-xl"
        >
          <i className="fas fa-plus"></i>
        </button>

        <span className="text-md font-medium">
          <span>{selected.length === 0 && "No laundries found."}</span> Click to
          select laundry items for booking.
        </span>
      </div>
    </>
  );
}

BookingSelection.propTypes = {
  selected: PropTypes.array.isRequired,
};
