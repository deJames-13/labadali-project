/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import Alert from "./Alert";
import Modal from "./Modal";
const payload = {
  booking_id: "",
  title: "Untitled Feedback",
  body: "",
  rating: 3,
  is_published: false,
};
export default function Feedback({ id, bookingId, toggle }) {
  const { setNotification, setErrors, errors } = useStateContext();
  const [form, setForm] = useState({ ...payload, booking_id: bookingId });
  const [edit, setEdit] = useState(true);
  const [loading, setLoading] = useState(true);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getFeedback(bookingId);
  }, [bookingId]);

  const getFeedback = (bookingId) => {
    setLoading(true);
    axiosClient
      .get("/feedbacks/" + bookingId)
      .then(({ data }) => {
        setLoading(false);
        setForm(data);
        setEdit(false);
      })
      .catch((err) => {
        setEdit(true);
        setLoading(false);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axiosClient
      .post("/feedbacks", form)
      .then((res) => {
        setLoading(false);
        setNotification("Thanks for your response!", 2000, "green-400");
        toggle(false);
      })
      .catch((err) => {
        const e = err.response;
        const error = e.data.message ?? Object.values(e.data.errors).join("\n");
        if (e.status === 422) {
          setErrors(error, 2000, "red-400", "top");
        }
        setLoading(false);
      });
  };

  let modal = document.getElementById(id);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      toggle(false);
    }
  });
  return (
    <div>
      {loading && (
        <div className="fixed z-100 w-screen h-screen inset-0 bg-gray-200 bg-opacity-50 top-0 grid place-items-center">
          <div className="loading"></div>
        </div>
      )}
      <div className={`${loading && "hidden"} font-extrabold uppercase`}>
        <Modal
          id={id}
          title={
            <h1 className=" font-extrabold uppercase">
              {!edit && "Thank you! You have already sent a feedback!"}
              {edit && "Send us a feedback!"}
            </h1>
          }
          main={
            <>
              <div className="flex flex-col space-y-3">
                <h3 className="font-bold text-lg">
                  {edit && "Rate our services!"}
                  {!edit && "We appreciate your feedback!"}
                </h3>
                <div className="w-full flex space-x-3 justify-center items-center">
                  {[4, 3, 2, 1, 0].map((star) => (
                    <button
                      disabled={!edit}
                      key={star}
                      className="text-2xl rounded-full"
                      onClick={(e) => setForm({ ...form, rating: star + 1 })}
                    >
                      <img
                        src={`/img/emoji-${star}.svg`}
                        alt=""
                        className={`w-12 aspect-square mask mask-squircle hover:scale-110 transition-all ease-in-out ${
                          form.rating == star + 1
                            ? "filter grayscale-0 scale-125 border-2 border-primary  bg-primary"
                            : "filter grayscale"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <h3 className="font-medium text-md">
                  {edit && "Do you have anything you’d like to share?"}
                  {!edit && "Thank you for your message!"}
                </h3>
                {/* title */}
                <div className="flex items-center space-x-4">
                  <label htmlFor="title" className="font-bold">
                    Title
                  </label>
                  <input
                    onChange={handleChange}
                    defaultValue={form.title}
                    disabled={!edit}
                    type="text"
                    id="title"
                    name="title"
                    className="input border-b-2 focus:outline-none rounded-lg w-full"
                  />
                </div>
                <textarea
                  onChange={handleChange}
                  defaultValue={form.body}
                  disabled={!edit}
                  name="body"
                  id="body"
                  cols="30"
                  rows="10"
                  className="textarea resize-none rounded-lg border border-cbrown focus:border-2 focus:border-cbrown focus:outline-none"
                ></textarea>
              </div>
              {errors && <Alert alert={errors} />}
            </>
          }
          action={
            <>
              <form method="dialog" className="modal-action">
                <button
                  onClick={(e) => toggle(false)}
                  className="btn btn-ghost"
                >
                  Close
                </button>
                {edit && (
                  <>
                    <button onClick={handleSubmit} className="btn bg-green-400">
                      Submit
                    </button>
                  </>
                )}
              </form>
            </>
          }
        />
      </div>
    </div>
  );
}
Feedback.propTypes = {
  id: PropTypes.string.isRequired,
  bookingId: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired,
};
