import "./BookingControls.css";

interface Props {
  activeOutputType: "list" | "chart" | string;
  onChange: (outputType: "list" | "chart") => void;
}

const BookingsControl = ({activeOutputType, onChange}: Props) => {
  return (
    <div className="bookings-control">
      <button
        className={activeOutputType === "list" ? "active" : ""}
        onClick={() => onChange("list")}
      >
        List
      </button>
      <button
        className={activeOutputType === "chart" ? "active" : ""}
        onClick={() => onChange("chart")}
      >
        Chart
      </button>
    </div>
  );
};

export default BookingsControl;
