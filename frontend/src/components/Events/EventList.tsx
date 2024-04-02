import React from "react";
import "./EventList.css";
import EventItem from "./EventItem/EventItem";
import {Events} from "../../pages/Event";

interface Props {
  events: Events[];
  authUserId: string;
  onViewDetail: (eventId: string) => void;
}

const EventList: React.FC<Props> = ({events, authUserId, onViewDetail}) => {
  const renderedEvents = events.map((event) => (
    <EventItem
      key={event._id}
      eventId={event._id}
      title={event.title}
      price={+event.price}
      date={event.date}
      userId={authUserId}
      creatorId={event.creator!._id!}
      onDetail={onViewDetail}
    />
  ));

  return <ul className="event__list">{renderedEvents}</ul>;
};

export default EventList;
