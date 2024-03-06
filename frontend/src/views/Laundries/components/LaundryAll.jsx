/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../contexts/ContextProvider";
import LaundryCard from "./LaundryCard";

export default function LaundryAll() {
  const { user } = useStateContext();
  const [laundries, setLaundries] = useState([]);
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    const getLaundries = () => {
      axiosClient
        .get("/laundries")
        .then(({ data }) => {
          setLaundries(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getLaundries();
  }, [user]);
  return (
    <>
      <h1 className="font-extrabold text-2xl uppercase">
        Browse our available Services
      </h1>
      <div className="divider"></div>
      <div className="w-full flex flex-wrap justify-center gap-6">
        {laundries.length > 0 &&
          laundries.map((laundry, i) => <LaundryCard key={i} {...laundry} />)}
      </div>
    </>
  );
}
