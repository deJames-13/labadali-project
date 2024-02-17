/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function BookingItem({
  id,
  title,
  price,
  description,
  qty = 1,
  selected,
  isHistory = false,
}) {
  const [unitPrice, setUnitPrice] = useState(price * qty);
  const [quantity, setQuantity] = useState(qty);

  useEffect(() => {
    if (selected) {
      setUnitPrice(quantity * price);
      const idx = selected.findIndex((laundry) => laundry.id == id);
      if (idx > -1) {
        selected[idx].qty = quantity;
        selected[idx].price = quantity * price;
      }
    }
  }, [quantity, price, selected, id]);

  return (
    <>
      <div className="flex flex-col-reverse space-y-3 items-center lg:flex-row lg:space-y-0 lg:justify-between w-full animate__animated animate__fadeInDown">
        <div className="w-full flex lg:justify-center items-center">
          <div className="w-full px-6 flex flex-col space-y-1 text-left">
            <span className="font-bold">{title}</span>
            <span className="font-sm">
              P {price}
              <br />
              {description}
            </span>
          </div>
        </div>
        <div className="px-6 pb-3  w-full flex lg:justify-center items-center">
          <div className="w-full flex space-x-6 lg:justify-center items-center text-center ">
            {!isHistory && (
              <i
                onClick={(e) => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className="fas fa-minus rounded-full border-2 border-cbrown p-1 scale-80 active:scale-75 hover:bg-gray-400 transition-all"
              ></i>
            )}
            <span className="font-bold text-xl">
              {" "}
              {isHistory && "x"}
              {quantity}
            </span>
            {!isHistory && (
              <i
                onClick={(e) => setQuantity(quantity + 1)}
                className="fas fa-plus rounded-full border-2 border-cbrown p-1 scale-80 active:scale-75 hover:bg-gray-400 transition-all"
              ></i>
            )}
          </div>
        </div>
        <div className="px-6 w-full flex lg:justify-center items-center">
          <span className="text-2xl font-bold">
            P {unitPrice ? unitPrice : price}
          </span>
        </div>
      </div>
      <div className="divider"></div>
      {isHistory && (
        <>
          {/* Inputs */}
          <input
            type="hidden"
            name="laundry_id"
            id={"laundry_" + id}
            value={id}
          />
          <input
            type="hidden"
            name={"qty_" + id}
            id={"qty_" + id}
            value={quantity}
          />
          <input
            type="hidden"
            name="unit_price"
            id={"unit_price_" + id}
            value={unitPrice ? unitPrice : price}
          />
        </>
      )}
    </>
  );
}
BookingItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  price: PropTypes.number,
  qty: PropTypes.number,
  description: PropTypes.string,
  selected: PropTypes.array,
  isHistory: PropTypes.bool,
};
BookingItem.defaultProps = {
  title: "Title",
  price: 1000,
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  qty: 1,
};
