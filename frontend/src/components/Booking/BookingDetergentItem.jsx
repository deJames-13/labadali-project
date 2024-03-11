import PropTypes from "prop-types";
export default function BookingDetergentItem({
  isActive = false,
  ...detergent
}) {
  const tags = detergent.tags.split(",");
  return (
    <div
      className={`card bg-base-100 shadow-xl border border-cbrown  w-full h-full overflow-hidden hover:scale-95 transition-all duration-300 ease-in-out`}
    >
      <figure>
        <img
          src={
            detergent.image_path
              ? detergent.image_path
              : "/img/samplelaundry.jpg"
          }
          alt="..."
          className="max-h-24"
        />
      </figure>
      <div
        className={`rounded-lg card-body p-4 hover:bg-primary hover:bg-opacity-69 ${
          isActive ? " bg-primary bg-opacity-69" : ""
        }`}
      >
        <h2 className="card-title text-lg">{detergent.item_name}</h2>
        <div className="flex flex-wrap gap-1 ">
          {/* split tags into ',' and create badges */}
          {tags &&
            tags.map((tag, i) => {
              return (
                <div key={i} className="badge badge-secondary">
                  {tag}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

BookingDetergentItem.propTypes = {
  isActive: PropTypes.bool,
};
