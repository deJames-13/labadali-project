/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function BookingItem({
  id,
  qty = 1,
  item,
  selected,
  isHistory,
  setIsChanged = () => {},
}) {
  const [unitPrice, setUnitPrice] = useState(parseFloat(item.price) * qty);
  const [quantity, setQuantity] = useState(qty);

  useEffect(() => {
    if (!isHistory && selected) {
      setUnitPrice(quantity * parseFloat(item.price));
      const idx = selected.findIndex((laundry) => laundry.id == id);
      if (idx > -1) {
        // max is max_qty
        if (quantity > (selected[idx].max_qty ?? 3)) {
          setQuantity(selected[idx].max_qty ?? 3);
        }
        // min is 1
        if (quantity < 1) {
          setQuantity(1);
        }
        selected[idx].quantity = quantity;
        selected[idx].item_total = quantity * parseFloat(item.price);
      }
      setIsChanged(true);
    }
  }, [quantity, selected, id, isHistory, setIsChanged, item.price]);
  return (
    <>
      <div className="w-full flex flex-col-reverse space-y-3 items-center md:flex-row md:space-y-0 md:justify-between  animate__animated animate__fadeInDown">
        <div className="w-full flex lg:justify-center items-center">
          <div className="w-full px-6 flex flex-col space-y-1 text-left">
            <span className="font-bold text-sm">{item.title}</span>
            <span className="font-medium text-xs">
              P {item.price}
              <br />
              {item.description}
            </span>
          </div>
        </div>

        <div className="px-6 pb-3  w-full flex lg:justify-center items-center">
          <div className="w-full md:ml-6 flex space-x-3 md:justify-center items-center text-center ">
            {!isHistory && (
              <i
                onClick={(e) => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className="fas fa-minus rounded-full border-2 border-cbrown p-1 scale-80 active:scale-75 hover:bg-gray-400 transition-all"
              ></i>
            )}
            <span className="font-bold text-xl">
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

        <div className="px-6 w-full flex md:justify-center items-center">
          <span className="text-2xl font-bold">
            P {unitPrice ? unitPrice : item.price}
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
            value={unitPrice ? unitPrice : item.price}
          />
        </>
      )}
    </>
  );
}
BookingItem.propTypes = {
  id: PropTypes.number.isRequired,
  item: PropTypes.any.isRequired,
  qty: PropTypes.number,
  selected: PropTypes.array,
  isHistory: PropTypes.bool,
  isChanged: PropTypes.bool,
  setIsChanged: PropTypes.func,
  setData: PropTypes.func,
};
BookingItem.defaultProps = {
  title: "Title",
  price: 1000,
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  qty: 1,
};
