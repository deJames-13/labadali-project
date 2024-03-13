import { useNavigate } from "react-router-dom";
export default function LaundryCard({ ...laundry }) {
  const navTo = useNavigate();
  const onBookNow = (e) => {
    e.preventDefault();
    navTo("/booking", {
      state: {
        laundry: laundry,
        book_now: true,
      },
    });
  };
  return (
    <>
      <div className="card card-compact w-[90%] max-w-72 bg-base-100 shadow-xl border border-gray-200 hover:bg-secondary hover:bg-opacity-35">
        <figure>
          <img
            src={
              laundry.image_path ? laundry.image_path : "/img/samplelaundry.jpg"
            }
            alt={laundry.title}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{laundry.title}</h2>
          <p className="font-bold">{laundry.price} per kilo</p>
          <p className="font-bold">{laundry.min_kilos} min. kilos</p>
          <p>{laundry.description}</p>
          <div className="card-actions justify-end">
            <button onClick={onBookNow} className="font-bold btn btn-primary">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
