/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import Chat from "../../components/Chat";
import { useStateContext } from "../../contexts/ContextProvider";
export default function Message() {
  const { user } = useStateContext();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState({});

  const messagesEndRef = useRef(null);
  const sendRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setLoading(true);
    const intervalId = setInterval(() => {
      getMessages(user.id);
      setLoading(false);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [user.id]);

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const getMessages = (id) => {
    axiosClient
      .get("/messages/" + id)
      .then(({ data }) => {
        setConversation(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSend = (e) => {
    e.preventDefault();
    const message = sendRef.current.value;
    if (message) {
      axiosClient
        .post("/messages", {
          sender_id: user.id,
          sender_type: "customer",
          content: message,
        })
        .then(({ data }) => {
          getMessages(user.id);
          sendRef.current.value = "";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="h-screen min-h-screen max-h-screen ">
      <div className="h-full bg-secondary bg-opacity-30 rounded-t-lg shadow-xl flex flex-col justify-between">
        {/* TOP */}
        <div className="flex space-x-3 items-center p-4 px-6 bg-primary border-b-2 border-b-cbrown rounded-t-lg">
          <div className="avatar online">
            <div className="w-10 ">
              <img src="/img/logo-icon-transparent.png" />
            </div>
          </div>
          <h1 className="text-xl font-bold uppercase text-cbrown flex items-center">
            LabaDali Chat
            {/* LOADING */}
            {loading && (
              <span className="mx-1 loading loading-sm loading-ring"></span>
            )}
          </h1>
          <i className="fas fa-dots"></i>
        </div>

        {/* BODY */}

        <div
          id="chatBody"
          className="my-4 p-6 flex flex-col flex-grow max-h-full h-full overflow-y-scroll scrollbar-hide"
        >
          {conversation.messages &&
            Object.keys(conversation.messages).map((k, index) => {
              const chat = conversation.messages[k];
              return chat.sender_type == "App\\Models\\Customer" ? (
                <Chat
                  key={index}
                  avatar={conversation.customer.image_path}
                  name={
                    conversation.customer.first_name +
                    " " +
                    conversation.customer.last_name
                  }
                  time={chat.created_at.split("T")[1].split(".")[0]}
                  message={chat.content}
                />
              ) : (
                <Chat
                  received
                  key={index}
                  avatar="/img/logo-icon-transparent.png"
                  name="Labadali Chat"
                  time={chat.created_at.split("T")[1].split(".")[0]}
                  message={chat.content}
                />
              );
            })}
          {/* NO MESSAGES */}
          {!loading && !conversation.messages && (
            <div className="flex justify-center h-full">
              <p className="text-gray-500 font-md">No messages yet.</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* MESSAGE BOX */}
        <div className="m-6 p-4 border border-cbrown rounded-xl flex space-x-4 items-center">
          {/* actions */}
          <div className="flex space-x-2 items-center">
            <button className="aspect-square btn btn-sm btn-ghost">
              <i className="fas fa-image"></i>
            </button>
          </div>
          <input
            ref={sendRef}
            type="text"
            className="container input input-bordered bg-transparent input-sm "
          />
          <button
            onClick={handleSend}
            className="aspect-square btn btn-sm btn-primary"
          >
            <i className="fas fa-send"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
