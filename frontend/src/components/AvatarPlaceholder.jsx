import PropTypes from "prop-types";

export default function AvatarPlaceholder({ text }) {
  return (
    <div className="avatar placeholder">
      <div
        className={"bg-neutral text-neutral-content mask mask-squircle w-12"}
      >
        <span className="text-3xl">{text}</span>
      </div>
    </div>
  );
}

AvatarPlaceholder.propTypes = {
  text: PropTypes.string.isRequired,
};
