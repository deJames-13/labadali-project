import PropTypes from "prop-types";
export default function Modal({ id, title, main, action, height = 400 }) {
  return (
    <>
      <dialog
        id={id}
        className="m-[0!important] modal max-h-screen overflow-auto z-50"
      >
        <div
          className={`modal-box min-h-[${height}px] max-h-full flex flex-col max-w-xl`}
        >
          <div className="w-full flex space-x-3 items-center justify-center">
            {title}
          </div>
          <div className="divider"></div>
          <div className="h-full w-full overflow-auto scrollbar-hide">
            {main}
          </div>
          <div className="modal-action">{action}</div>
        </div>
      </dialog>
    </>
  );
}

Modal.propTypes = {
  id: PropTypes.string,
  title: PropTypes.element,
  main: PropTypes.element,
  action: PropTypes.element,
  height: PropTypes.number,
};
