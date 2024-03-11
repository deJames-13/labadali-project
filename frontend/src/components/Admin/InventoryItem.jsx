/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";
import Modal from "../Modal";
export default function InventoryItem({
  setViewItem,
  selected,
  setSelected,
  ...item
}) {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleViewItem = (e) => {
    setViewItem(true);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    document.getElementById("delete-item-modal").showModal();
  };
  const onDelete = () => {
    setLoading(true);
    axiosClient
      .delete("/items/" + selected.id)
      .then(({ data }) => {
        setSelected({});
        setLoading(false);
        setViewItem(false);
        document.getElementById("delete-item-modal").close();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <tr onDoubleClick={handleViewItem} onClick={(e) => setSelected(item)}>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img
                  src={
                    item.image_path ? item.image_path : "/img/samplelaundry.jpg"
                  }
                  alt="..."
                />
              </div>
            </div>
            <div>
              <div className="font-bold">{item.item_name}</div>
            </div>
          </div>
        </td>
        <td>{item.tags}</td>
        <td>{item.stock}</td>
        <td>{item.instructions}</td>
        <td>
          {new Date(item.updated_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </td>
        <td className="flex space-x-2 items-center justify-center px-3 h-full">
          <button onClick={handleViewItem} className="btn btn-primary btn-xs">
            details
          </button>
          <button onClick={handleDelete} className="btn btn-xs btn-error">
            <i className="fas fa-trash"></i>
          </button>

          <div>
            <Modal
              id="delete-item-modal"
              title={
                <h1 className="font-bold text-lg w-full text-left flex items-center space-x-3">
                  <i className="fas fa-shirt"></i>
                  <span>
                    Delete Item {selected.id ?? "_ "}
                    {loading && <span className="loading loading-ring"></span>}
                  </span>
                </h1>
              }
              main={
                <h2 className="font-medium">
                  Are you sure you want to delete this item with title:{" "}
                  <span className="font-bold italic">{selected.item_name}</span>{" "}
                  ?
                </h2>
              }
              action={
                <>
                  <form method="dialog">
                    <div className="flex items-center space-x-3">
                      <button className="btn">Cancel</button>
                      <button onClick={onDelete} className="btn btn-error">
                        Confirm
                      </button>
                    </div>
                  </form>
                </>
              }
            />
          </div>
        </td>
      </tr>
    </>
  );
}

InventoryItem.propTypes = {
  setSelected: PropTypes.func,
  setViewItem: PropTypes.func,
  selected: PropTypes.object,
};
