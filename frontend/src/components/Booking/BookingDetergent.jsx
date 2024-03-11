/* eslint-disable no-unused-vars */

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import Modal from "../Modal";
import BookingDetergentItem from "./BookingDetergentItem";

export default function BookingDetergent({ setDetergent }) {
  const [detergents, setDetergents] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    getDetergents();
  }, []);

  useEffect(() => {
    selected && setDetergent(selected);
    document.getElementById("bookingDetergent").close();
  }, [selected, setDetergent]);

  const getDetergents = () => {
    axiosClient
      .get("/items?tags=detergent")
      .then(({ data }) => {
        setDetergents(data);
        setSelected(data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      id="bookingDetergent"
      title={
        <h1 className="text-2xl font-bold text-center">Select Detergent</h1>
      }
      main={
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 items-center">
          {detergents.map((d, i) => {
            return (
              <div onClick={(e) => setSelected(d)} key={i} className="h-full">
                <BookingDetergentItem isActive={selected.id === d.id} {...d} />
              </div>
            );
          })}
          {detergents.length < 1 && (
            <>
              <h1 className="font-bold">
                No laundry detergents found in our inventory. You can contact us
                for queries.
              </h1>
            </>
          )}
        </div>
      }
      action={<></>}
      width={6}
    />
  );
}

BookingDetergent.propTypes = {
  setDetergent: PropTypes.func.isRequired,
};
