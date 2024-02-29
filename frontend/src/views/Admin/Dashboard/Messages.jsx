/* eslint-disable no-unused-vars */
import { useState } from "react";
import MessageListItem from "../../../components/Admin/MessageListItem";

export default function Messages() {
  const [loading, setLoading] = useState();

  return (
    <div className="h-screen min-h-screen flex flex-col space-y-6">
      <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:justify-between lg:items-center">
        <div className="flex space-x-3 uppercase font-bold text-2xl  items-center">
          <i className="fas fa-message"></i>
          <h1>
            Message Lists{" "}
            {loading && <span className="loading loading-dots"></span>}{" "}
          </h1>
        </div>

        <div className="lg:max-w-sm flex justify-end px-6 items-center space-x-3 border rounded-full border-cbrown">
          <input
            type="text"
            className="w-full input input-sm input-ghost input-md bg-transparent focus:border-none focus:outline-none"
          />
          <i className="fas fa-magnifying-glass "></i>
        </div>
      </div>
      <div className="divider"></div>
      <div className="py-8 h-3/4 min-h-3/4 flex flex-col space-y-3 border border-cbrown p-3 rounded-lg bg-secondary bg-opacity-20 shadow-lg">
        <MessageListItem id={1} />
        <MessageListItem id={2} />
      </div>
    </div>
  );
}
