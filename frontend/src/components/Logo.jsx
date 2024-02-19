import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Logo({ extendClass, color }) {
  return (
    <Link
      to={"/"}
      className={`logo flex space-x-2 justify-center items-center hover:animate-bounce  animate__animated animate__fadeIn ${extendClass} ${color}`}
    >
      <img
        className="w-20 inline-block"
        src="/img/logo-icon-transparent.png"
        alt=""
      />
      <span className="text-4xl uppercase font-bobbyjones">labadali</span>
    </Link>
  );
}

Logo.propTypes = {
  extendClass: PropTypes.string,
  color: PropTypes.string,
};
Logo.defaultProps = {
  color: "text-primary",
};
