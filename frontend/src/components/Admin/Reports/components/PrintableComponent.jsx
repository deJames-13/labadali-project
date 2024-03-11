import PropTypes from "prop-types";
import { useRef } from "react";
import ReactToPrint from "react-to-print";

export default function PrintableComponent({ children }) {
  const componentRef = useRef();

  return (
    <>
      <ReactToPrint
        trigger={() => (
          <button className="btn btn-sm rounded-lg">Print this out!</button>
        )}
        content={() => componentRef.current}
      />
      <div ref={componentRef}>{children}</div>
    </>
  );
}

PrintableComponent.propTypes = {
  children: PropTypes.node.isRequired,
};
