import React from "react";
import "./EventItem.css";

interface Props {
  eventId: string;
  title: string;
  price: number;
  date: string | Date;
  userId: string;
  creatorId: string;
  onDetail: (eventId: string) => void;
}

const EventItem: React.FC<Props> = ({
  eventId,
  title,
  price,
  date,
  userId,
  creatorId,
  onDetail,
}) => (
  <li key={eventId} className="events__list-item">
    <div>
      <h1>{title}</h1>
      <h2>
        ${price} - {new Date(date).toLocaleDateString()}
      </h2>
    </div>
    <div>
      {userId === creatorId ? (
        <p>Your the owner of this event.</p>
      ) : (
        <button className="btn" onClick={() => onDetail(eventId)}>
          View Details
        </button>
      )}
    </div>
  </li>
);

export default EventItem;
