import PropTypes from "prop-types";
Chat.propTypes = {
  id: PropTypes.number,
  received: PropTypes.bool,
  avatar: PropTypes.string,
  name: PropTypes.string,
  time: PropTypes.string,
  message: PropTypes.string,
};

export default function Chat({ id, received, avatar, name, time, message }) {
  return (
    <>
      {/* Received */}
      <div key={id} className={`chat chat-${received ? "start" : "end"}`}>
        {avatar && (
          <div className="chat-image avatar">
            <div className="w-10 rounded-full ring">
              <img
                className="p-[3px] w-full aspect-square rounded-full"
                alt="Tailwind CSS chat bubble component"
                src={avatar}
              />
            </div>
          </div>
        )}
        {!avatar && (
          <div className="chat-image avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-10">
              <span className="font-bold">{name[0]}</span>
            </div>
          </div>
        )}
        <div
          className={`chat-header flex items-center ${
            received ? "" : "flex-row-reverse"
          }`}
        >
          {name}
          <time className="text-xs opacity-50 mx-2">{time}</time>
        </div>
        <div
          className={`chat-bubble text-sm text-cbrown bg-${
            received ? "primary" : "secondary"
          } bg-opacity-50`}
        >
          {message}
        </div>
      </div>
    </>
  );
}
