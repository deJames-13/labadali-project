/* eslint-disable no-unused-vars */
import { format } from "date-fns";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import ReactToPrint from "react-to-print";

export default function Tab({
  children,
  reportId,
  title = "Tab",
  active = false,
  onClick = () => {},
  onDateChange = () => {},
  dateValue = { startDate: "", endDate: "" },
}) {
  const componentRef = useRef();
  const e = new Date();
  const s = new Date(e.getFullYear(), e.getMonth() - 1, 1);
  const getComponent = () => document.getElementById(reportId);
  const handleDatePickerValueChange = (newValue) => {
    onDateChange(newValue);
  };

  return (
    <>
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab w-full whitespace-nowrap"
        aria-label={title}
        id={title}
        checked={active}
        onChange={onClick}
      />
      <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box p-6"
      >
        <div className="w-full text-right">
          <ReactToPrint
            trigger={() => (
              <button className="btn btn-sm rounded-lg">Print</button>
            )}
            content={() => componentRef.current}
          />
        </div>
        <div id={reportId} ref={componentRef} className="print:p-6">
          <div className="divider"></div>
          <div className="w-full flex justify-between items-center">
            <div className="w-full">
              <div className="w-full text-center">
                <h1 className="font-extrabold text-3xl uppercase text-secondary">
                  LabaDali: Laundry Shop
                </h1>
                <p>East Service Road, Taguig 1630, Philippines</p>
              </div>
              <div className="divider"></div>
              <h1 className="font-extrabold text-xl uppercase">{title}</h1>
              <div className="w-full flex justify-between">
                <div>
                  <div className="flex space-x-2 items-center justify-center">
                    <label htmlFor="date" className="text-lg font-bold">
                      Date:
                    </label>
                    <Datepicker
                      containerClassName=""
                      value={dateValue}
                      theme={"cupcake"}
                      inputClassName="input input-sm rounded-none input-bordered"
                      popoverDirection={"left"}
                      toggleClassName="invisible"
                      onChange={handleDatePickerValueChange}
                      showShortcuts={true}
                      primaryColor={"white"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="divider"></div>
          {children}
        </div>
      </div>
    </>
  );
}
Tab.propTypes = {
  children: PropTypes.node,
  reportId: PropTypes.string,
  title: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  onDateChange: PropTypes.func,
  dateValue: PropTypes.object,
};
