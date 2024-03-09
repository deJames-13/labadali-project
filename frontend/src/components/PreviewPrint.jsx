/* eslint-disable no-unused-vars */
import { PropTypes } from "prop-types";
import React from "react";
import ReactToPrint from "react-to-print";

class PrintableComponent extends React.Component {
  render() {
    const currentDate = new Date();
    const { id, title, toPrint } = this.props;
    return (
      <div id={id}>
        <div className="divider"></div>
        <div className="px-6 w-full flex space-x-3 items-center justify-between">
          <h1 className="text-2xl font-bold text-center">
            <strong>{title > "" ? title : "Chart Report"}</strong>
          </h1>
          <p>Print Date: {currentDate.toLocaleDateString()}</p>
        </div>
        <div className="divider"></div>
        <div className="flex items-center justify-center h-full w-full overflow-auto scrollbar-hide">
          {toPrint}
        </div>
      </div>
    );
  }
}

export default function PreviewPrint({ id, title, toPrint }) {
  let componentRef = React.createRef();
  return (
    <dialog
      id={id}
      className="m-[0px!important] p-4 modal min-h-screen overflow-auto z-50"
    >
      <div className={`modal-box  max-h-full flex flex-col max-w-[210mm]`}>
        <PrintableComponent
          id={id}
          title={title}
          toPrint={toPrint}
          ref={componentRef}
        />
        <div className="modal-action">
          <button
            onClick={(e) => document.getElementById(id).close()}
            className="btn btn-sm btn-ghost rounded-lg"
          >
            Close
          </button>
          <div className="divider"></div>
          <ReactToPrint
            trigger={() => (
              <button className="btn btn-sm btn-primary rounded-lg">
                Print
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
      </div>
    </dialog>
  );
}

PrintableComponent.propTypes = {
  toPrint: PropTypes.any,
  title: PropTypes.any,
  id: PropTypes.string,
};
PreviewPrint.propTypes = {
  toPrint: PropTypes.any,
  title: PropTypes.any,
  id: PropTypes.string,
};
