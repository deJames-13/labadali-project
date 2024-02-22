import PropTypes from "prop-types";
export default function Modal({ id, title, main, action }) {
  return (
    <>
      <dialog
        id={id}
        className="m-[0!important] modal max-h-screen overflow-auto"
      >
        <div className="modal-box min-h-[400px] max-h-full flex flex-col justify-between">
          <div className="flex space-x-3 items-center justify-center">
            {title}
          </div>
          <div className="divider"></div>
          <div className="h-full overflow-auto scrollbar-hide">{main}</div>
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
};
