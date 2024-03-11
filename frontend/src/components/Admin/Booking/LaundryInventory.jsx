/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import LaundryInventoryItem from "./LaundryInventoryItem";

export default function LaundryInventory({ bookingId, inventories }) {
  const [items, setItems] = useState(inventories);

  return (
    <div className="p-2 py-4">
      <div className="flex space-x-2 items-center">
        <h1 className="font-bold text-xl">Items</h1>
      </div>
      <div className="divider m-0"></div>
      <div className="flex flex-col w-full items-center space-x-3">
        {items &&
          items.map((item, index) => (
            <LaundryInventoryItem key={index} {...item} />
          ))}
      </div>
    </div>
  );
}

LaundryInventory.propTypes = {
  bookingId: PropTypes.number.isRequired,
  inventories: PropTypes.any,
};
