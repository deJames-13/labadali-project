import PropTypes from "prop-types";
export default function Modal({
  id,
  title,
  main,
  action,
  height = 0,
  width = 0,
}) {
  return (
    <dialog
      id={id}
      className="fixed m-[0px!important] modal w-screen h-screen flex items-center justify-center overflow-hidden z-50 animated__animate animated__fadeInDown"
    >
      <div
        className={`container bg-base-100 p-6 rounded-lg flex flex-col `}
        style={{
          maxWidth: `${width > 0 ? width * 10 : 40}rem`,
          maxHeight: `${height > 0 ? height * 10 : 95}%`,
        }}
      >
        <div className="w-full flex space-x-3 items-center justify-center">
          {title}
        </div>
        <div className="divider"></div>
        <div className="h-full w-full overflow-auto scrollbar-hide">{main}</div>
        <div className="modal-action">{action}</div>
      </div>
    </dialog>
  );
}

Modal.propTypes = {
  id: PropTypes.string,
  title: PropTypes.element,
  main: PropTypes.element,
  action: PropTypes.element,
  height: PropTypes.number,
  width: PropTypes.number,
};
