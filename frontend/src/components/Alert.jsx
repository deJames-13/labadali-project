import PropTypes from "prop-types";

export default function Alert({ alert }) {
  return (
    <>
      <div key={alert.time} className=" fixed inset-0 bg-base top-0 ">
        <div
          className={`toast ${alert.position ? "toast-" + alert.position : ""}`}
        >
          {alert.message.split("\n").map((m, i) => (
            <div
              key={i}
              className={`alert bg-${alert.bg} bg-opacity-100 animate__animated animate__fadeInRight`}
            >
              <span>{m}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
};
