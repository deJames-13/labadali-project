/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import MessageListItem from "../../../components/Admin/MessageListItem";

export default function Messages() {
  const [loading, setLoading] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = () => {
    setLoading(true);
    axiosClient
      .get("/messages")
      .then((res) => {
        console.log(res.data);
        setMessages(res.data ?? []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="h-screen min-h-screen flex flex-col space-y-6 ">
      <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:justify-between lg:items-center">
        <div className="flex space-x-3 uppercase font-bold text-2xl  items-center">
          <i className="fas fa-message"></i>
          <h1>
            Message Lists{" "}
            {loading && <span className="loading loading-dots"></span>}{" "}
          </h1>
        </div>
      </div>
      <div className="divider"></div>
      <div className="overflow-y-auto py-8 h-3/4 min-h-3/4 flex flex-col space-y-3 border border-cbrown p-3 rounded-lg bg-secondary bg-opacity-20 shadow-lg">
        {messages.customers &&
          messages.customers.map((message, index) => (
            <MessageListItem key={index} {...message} />
          ))}
      </div>
    </div>
  );
}
