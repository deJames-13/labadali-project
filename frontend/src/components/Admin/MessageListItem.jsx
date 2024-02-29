import PropTypes from "prop-types";
import { Link } from "react-router-dom";
MessageListItem.propTypes = {
  id: PropTypes.number,
};
export default function MessageListItem({ id }) {
  return (
    <Link to={"/admin/message/" + id}>
      {/* Message Item */}
      <div
        className="max-h-16 p-2 px-6 flex space-x-3 items-center border border-b-2 border-b-cbrown rounded-lg shadow-lg
        bg-secondary bg-opacity-20
      hover:bg-gray-300 cursor-pointer hover:scale-x-[1.01] transform transition-all ease-in-out   
      
      "
      >
        <img
          src="https://source.unsplash.com/random"
          alt="."
          className="border aspect-square rounded-full w-12"
        />
        <div className="h-full w-3/4">
          <div className="flex space-x-2 items-center">
            <h4 className="text-md font-bold">John Doe</h4>
            <span className="text-xs font-light text-gray-700 "> 6m ago</span>

            <div className="badge badge-primary badge-xs"></div>
          </div>

          <p className="text-sm text-gray-700 h-5 text-ellipsis truncate">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
            exercitationem officiis ducimus atque temporibus quis suscipit non
            recusandae labore earum quae, culpa fugit blanditiis vero voluptatem
            nesciunt error commodi ab.
          </p>
        </div>
      </div>
    </Link>
  );
}
