/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";

export default function Message() {
  const { id } = useParams();
  return (
    <div className="h-screen min-h-screen max-h-screen ">
      <div className="h-full bg-secondary bg-opacity-30 rounded-t-lg shadow-xl flex flex-col justify-between">
        {/* TOP */}
        <div className="flex space-x-3 items-center p-4 px-6 bg-primary border-b-2 border-b-cbrown rounded-t-lg">
          <div className="avatar online">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <h1 className="text-xl font-bold">John Doe</h1>
          <i className="fas fa-dots"></i>
        </div>

        {/* BODY */}
        <div className="my-4 p-6 flex-grow max-h-full h-full overflow-y-scroll scrollbar-hide">
          {/* Received */}
          <div className="chat chat-start ">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble text-sm text-cbrown bg-primary bg-opacity-50">
              You were the Chosen One! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Hic eum impedit voluptate omnis corrupti nobis,
              voluptatem ex consequatur culpa voluptas, possimus velit quam
              perspiciatis totam sed ut, necessitatibus vero sequi. You were the
              Chosen One! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Hic eum impedit voluptate omnis corrupti nobis, voluptatem
              ex consequatur culpa voluptas, possimus velit quam perspiciatis
              totam sed ut, necessitatibus vero sequi. You were the Chosen One!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic eum
              impedit voluptate omnis corrupti nobis, voluptatem ex consequatur
              culpa voluptas, possimus velit quam perspiciatis totam sed ut,
              necessitatibus vero sequi. You were the Chosen One! Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Hic eum impedit
              voluptate omnis corrupti nobis, voluptatem ex consequatur culpa
              voluptas, possimus velit quam perspiciatis totam sed ut,
              necessitatibus vero sequi. You were the Chosen One! Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Hic eum impedit
              voluptate omnis corrupti nobis, voluptatem ex consequatur culpa
              voluptas, possimus velit quam perspiciatis totam sed ut,
              necessitatibus vero sequi.
            </div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>

          {/* Send */}
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <div className="chat-header">
              Anakin
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble text-sm text-cbrown bg-secondary bg-opacity-50">
              I hate you!
            </div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>
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
            type="text"
            className="container input input-bordered bg-transparent input-sm "
          />
          <button className="aspect-square btn btn-sm btn-primary">
            <i className="fas fa-send"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
