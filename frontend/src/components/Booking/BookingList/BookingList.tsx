import React from "react";
import "./BookingList.css";

interface Booking {
  _id: string;
  event: {
    title: string;
  };
  createdAt: string;
}

interface Props {
  bookings: Booking[];
  onDelete: (bookingId: string) => void;
}

const BookingList: React.FC<Props> = ({bookings, onDelete}) => {
  if (bookings.length === 0) {
    return <div>No Booking for you</div>;
  }
  return (
    <ul className="bookings__list">
      {bookings?.map((booking) => (
        <li key={booking._id} className="bookings__item">
          <div className="bookings__item-data">
            {booking.event.title} -{" "}
            {new Date(+booking.createdAt).toLocaleDateString()}
          </div>
          <div className="bookings__item-actions">
            <button className="btn" onClick={() => onDelete(booking._id)}>
              Cancel
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BookingList;
