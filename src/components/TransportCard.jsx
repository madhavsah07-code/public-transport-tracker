import { Bus, Car, Bike, TrainFront } from "lucide-react";
import NextArrivalBadge from "./NextArrivalBadge";

function TransportCard({ data, isNext, onBook }) {
  const renderIcon = () => {
    switch (data.type) {
      case "Bus":
        return <Bus size={18} />;
      case "Car":
        return <Car size={18} />;
      case "Bike":
        return <Bike size={18} />;
      case "Train":
        return <TrainFront size={18} />;
      default:
        return null;
    }
  };

  return (
    <div
  className={`card zone-${data.zone} ${isNext ? "highlight" : ""}`}
>
      {isNext && <NextArrivalBadge />}
      <h3>
        {renderIcon()} {data.route}
      </h3>
      <p>Type: {data.type}</p>
      <p>Arrival in {data.arrival} mins</p>
      <p>Status: {data.status}</p>
      <p className="description" title={data.description}>
  <strong>Description:</strong>{" "}
  {data.description.length > 40
    ? data.description.slice(0, 40) + "..."
    : data.description}
</p>
<p><strong>Zone:</strong> {data.zone}</p>
<p><strong>Price:</strong> ₹{data.price}</p>
<button
  className="book-btn"
  onClick={() => onBook && onBook(data)}
>
  Book Now
</button>
    </div>
  );
}

export default TransportCard;