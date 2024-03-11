/* eslint-disable no-unused-vars */

import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import axiosClient from "../../axios-client";
import Modal from "../Modal";
InventoryView.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.any,
};

// EMPTY OBJECT FOR ADDING NEW ITEM
const itemEmpty = {
  item_name: null,
  stock: null,
  tags: null,
  instructions: null,
  image: null,
  image_path: null,
};

export default function InventoryView({
  id,
  isAdd,
  setIsAdd,
  setViewItem,
  data,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);

  const prev = useRef({});
  useEffect(() => {
    isAdd && setIsEdit(true);
    setItem(isAdd ? itemEmpty : data);
  }, [id, isAdd, data]);

  const handleChanges = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setItem({
        ...item,
        image: event.target.files[0],
        image_path: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setViewItem(false);
    setIsEdit(false);
    setItem(prev.current);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setViewItem(false);
    setIsAdd(false);
    document.getElementById("view-item-modal").close();
  };
  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    prev.current = { ...item };

    // console.log("Sending: ", userData);
    // FORM OBJECT
    let reqForm = new FormData();
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    const path = `/items${!isAdd ? "/" + item.id : ""}`;
    Object.keys(item).forEach((key) => {
      item[key] && reqForm.append(key, item[key]);
    });
    !isAdd && reqForm.append("_method", "PUT");
    // END FORM OBJECT

    axiosClient
      .post(path, reqForm, config)
      .then((res) => {
        setItem(res.data);
        console.log(res.data);
        setViewItem(false);
        setIsEdit(false);
        setIsAdd(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  let modal = document.getElementById("view-item-modal");
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setViewItem(false);
      setIsAdd(false);
      setIsEdit(false);
    }
  });
  return (
    <Modal
      id="view-item-modal"
      title={
        <div className="flex items-center gap-3 text-xl uppercase">
          <i className="fas fa-box"></i>
          <div className="font-bold ">
            Inventory {!isAdd && item.id}
            {loading && <div className="loading loading-dots"></div>}
          </div>
        </div>
      }
      main={
        <>
          {/* with isEdit and isAdd state and view state p if view input if edit and add */}

          <div className="flex items-start gap-4 ">
            <div className="w-1/2 avatar flex flex-col space-y-2 rounded-lg border-2 p-1 border-primary aspect-square shadow-xl">
              <img
                src={
                  item.image_path ? item.image_path : "/img/samplelaundry.jpg"
                }
                alt={item.title}
                className="aspect-square w-full"
              />

              {isEdit && (
                <>
                  <label
                    htmlFor="profile_image"
                    className="btn btn-primary btn-xs font-bold text-cbrown"
                  >
                    Change Picture
                  </label>
                  <input
                    required
                    name="profile_image"
                    id="profile_image"
                    type="file"
                    onChange={onImageChange}
                    className="hidden"
                  />
                </>
              )}
            </div>
            <div className="w-1/2 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="item_name" className="font-bold">
                  Item Name
                </label>
                <input
                  type="text"
                  name="item_name"
                  value={item.item_name || ""}
                  onChange={handleChanges}
                  disabled={!isEdit}
                  className="input input-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="stock" className="font-bold">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  value={item.stock || ""}
                  onChange={handleChanges}
                  disabled={!isEdit}
                  className="input input-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="tags" className="font-bold">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={item.tags || ""}
                  onChange={handleChanges}
                  disabled={!isEdit}
                  className="input input-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="instructions" className="font-bold">
                  Instructions
                </label>
                <textarea
                  name="instructions"
                  value={item.instructions || ""}
                  onChange={handleChanges}
                  disabled={!isEdit}
                  rows={5}
                  className="textarea resize-none"
                />
              </div>
            </div>
          </div>
        </>
      }
      action={
        <form method="dialog">
          <div className="flex items-center space-x-3">
            {!isEdit && (
              <>
                <button onClick={handleClose} className="btn">
                  Close
                </button>
                <button
                  onClick={(e) => {
                    prev.current = { ...item };
                    setIsEdit(true);
                  }}
                  className="btn btn-primary"
                >
                  Edit
                </button>
              </>
            )}
            {isEdit && (
              <>
                <button
                  onClick={isAdd ? handleClose : handleCancel}
                  className="btn"
                >
                  Cancel
                </button>
                <button onClick={handleSave} className="btn btn-success">
                  Save
                </button>
              </>
            )}
          </div>
        </form>
      }
    />
  );
}

InventoryView.propTypes = {
  id: PropTypes.string,
  setViewItem: PropTypes.func,
  setIsAdd: PropTypes.func,
  isAdd: PropTypes.any,
  data: PropTypes.any,
};
