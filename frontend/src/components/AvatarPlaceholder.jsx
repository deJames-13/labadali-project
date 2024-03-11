import PropTypes from "prop-types";

export default function AvatarPlaceholder({ text }) {
  return (
    <div className="avatar placeholder w-full h-full">
      <div
        className={
          "w-full h-full bg-neutral text-neutral-content mask mask-squircle"
        }
      >
        <span className="text-3xl">{text}</span>
      </div>
    </div>
  );
}

AvatarPlaceholder.propTypes = {
  text: PropTypes.string.isRequired,
};
