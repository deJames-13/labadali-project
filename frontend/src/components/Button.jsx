import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Button({
  text,
  icon,
  link,
  customClass,
  extendClass,
  activeClass,
  isActive,
  isLink,
  onClick,
}) {
  return isLink ? (
    <Link
      to={link}
      className={customClass + (isActive ? activeClass : extendClass)}
    >
      {icon}
      {text}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={customClass + (isActive ? activeClass : extendClass)}
    >
      {icon}
      {text}
    </button>
  );
}

Button.propTypes = {
  icon: PropTypes.element,
  customClass: PropTypes.string,
  extendClass: PropTypes.string,
  text: PropTypes.string,
  isLink: PropTypes.bool,
  link: PropTypes.string,
  activeClass: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};
Button.defaultProps = {
  icon: "",
  extendClass: "text-cbrown font-medium",
  customClass:
    "w-full btn btn-ghost flex justify-start items-center hover:ml-4 hover:font-bold hover:text-cbrown  transition-all ease-in-out duration-300 ",
  text: "Button Name",
  link: "#",
  isLink: false,
  isActive: false,
  activeClass: "text-primary text-xl font-bold",
};
