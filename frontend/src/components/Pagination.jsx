/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useState } from "react";
Pagination.propTypes = {
  setPage: PropTypes.func.isRequired,
  links: PropTypes.shape({
    first: PropTypes.string,
    last: PropTypes.string,
    prev: PropTypes.string,
    next: PropTypes.string,
  }),
};
export default function Pagination({ setPage, ...links }) {
  const first = links.first ? links.first.split("page=")[1] : null;
  const last = links.last ? links.last.split("page=")[1] : null;
  const prev = links.prev ? links.prev.split("page=")[1] : null;
  const next = links.next ? links.next.split("page=")[1] : null;

  // use state for middle link
  const [middle, setMiddle] = useState(0);

  const handleClick_first = (e) => {
    setPage(first);
    e.preventDefault();
  };
  const handleClick_last = (e) => {
    setPage(last);
    e.preventDefault();
  };
  const handleClick_prev = (e) => {
    setPage(prev);
    e.preventDefault();
  };
  const handleClick_next = (e) => {
    setPage(next);
    e.preventDefault();
  };
  if (!first && !last && !prev && !next) {
    return null;
  }
  return (
    <>
      <div className="join  flex items-center justify-center">
        <button
          onClick={handleClick_prev}
          disabled={!prev}
          className="join-item btn-sm bg-primary hover:bg-secondary hover:bg-opacity-69 btn "
        >
          Prev
        </button>
        <button
          onClick={handleClick_first}
          disabled={!first}
          className="join-item btn-sm bg-primary hover:bg-secondary hover:bg-opacity-69 btn "
        >
          {first}
        </button>
        <button
          onClick={handleClick_last}
          disabled={!last && last !== first}
          className="join-item btn-sm bg-primary hover:bg-secondary hover:bg-opacity-69 btn "
        >
          {last}
        </button>
        <button
          onClick={handleClick_next}
          disabled={!next}
          className="join-item btn-sm bg-primary hover:bg-secondary hover:bg-opacity-69 btn"
        >
          Next
        </button>
      </div>
    </>
  );
}
