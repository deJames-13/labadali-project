/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import InventoryItem from "../../../components/Admin/InventoryItem";
import InventoryView from "../../../components/Admin/InventoryView";
export default function ManageInventories() {
  const [items, setItems] = useState([]);
  const [viewItem, setViewItem] = useState(false);
  const [selected, setSelected] = useState({});
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    getItems();
    viewItem && document.getElementById("view-item-modal").showModal();
  }, [selected, viewItem]);

  const getItems = () => {
    axiosClient
      .get("/items")
      .then(({ data }) => {
        setItems(data);
      })
      .catch((err) => []);
  };

  const handleAdd = () => {
    setIsAdd(true);
    setViewItem(true);
  };

  return (
    <div className="min-h-screen">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-xl">Manage Inventories</h1>
          <button onClick={handleAdd} className="btn bg-green-400 btn-sm">
            <i className="fas fa-plus"></i>
            Add Inventory
          </button>
        </div>
      </div>
      <div className="divider"></div>
      <h1 className="font-bold ">Selected Id: {selected.id}</h1>

      <div className="divider"></div>
      <div className="overflow-x-aut px-6">
        <table className="table ">
          <thead>
            <tr>
              <th>Item</th>
              <th>Tags</th>
              <th>Stock Quantity</th>
              <th>Instructions</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 &&
              items.map((item, i) => {
                return (
                  <InventoryItem
                    key={i}
                    setSelected={setSelected}
                    setViewItem={setViewItem}
                    selected={selected}
                    {...item}
                  />
                );
              })}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {
        <InventoryView
          data={selected}
          isAdd={isAdd}
          setIsAdd={setIsAdd}
          setViewItem={setViewItem}
        />
      }
    </div>
  );
}
