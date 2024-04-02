import {useCallback, useEffect, useRef, useState} from "react";
import {useAppContext} from "../context/AppContext";
import Modal from "../components/Modal/Modal";
import {bookEvent, createEvent, getAllEvents} from "../graphQL/query";
import {API_URL} from "../apiUrl";
import "./Event.css";
import Backdrop from "../components/Backdrop/Backdrop";
import Spinner from "../components/Spinner/Spinner";
import EventList from "../components/Events/EventList";

export interface Events {
  _id: string;
  title: string;
  description: string;
  date: string;
  price: string;
  creator?: {
    _id: string;
  };
}

export default function Event() {
  const [creating, setCreating] = useState(false);
  const [events, setEvents] = useState<Events[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Events | null>(null);
  const context = useAppContext();
  const titleElRef = useRef<HTMLInputElement>(null);
  const priceElRef = useRef<HTMLInputElement>(null);
  const dateElRef = useRef<HTMLInputElement>(null);
  const descriptionElRef = useRef<HTMLTextAreaElement>(null);
  const isActive = useRef(true);
  async function modalConfirmHandler() {
    setCreating(false);
    const title = titleElRef.current?.value as string;
    const price = +priceElRef.current!.value! as number;
    const date = dateElRef.current?.value as string;
    const description = descriptionElRef.current?.value as string;

    if (
      title?.trim().length === 0 ||
      price <= 0 ||
      date?.trim().length === 0 ||
      description?.trim().length === 0
    ) {
      return;
    }

    // const event = {title, price, date, description};

    const createEventQuery = createEvent(title, description, price, date);
    // const token = context?.token;

    try {
      const sendData = await fetch(`${API_URL}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createEventQuery),
      });
      if (sendData.status !== 200 && sendData.status !== 201) {
        throw new Error("Failed!");
      }

      const responseData = await sendData.json();
      console.log(responseData);

      const eventData: Events = {
        _id: responseData.data.createEvent._id,
        title: responseData.data.createEvent.title,
        description: responseData.data.createEvent.description,
        date: responseData.data.createEvent.date,
        price: responseData.data.createEvent.price,
        creator: {
          _id: context?.userId as string,
        },
      };

      setEvents((prevState) => [...prevState, eventData]);
    } catch (err) {
      console.log(err);
    }
  }

  const modalCancelHandler = () => {
    setCreating(false);
    setSelectedEvent(null);
  };

  const fetchEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      const eventQuery = getAllEvents();
      const sendData = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventQuery),
      });

      if (sendData.status !== 200 && sendData.status !== 201) {
        throw new Error("Failed!");
      }
      const responseData = await sendData.json();
      const events = responseData.data.events;
      if (isActive.current) {
        setEvents(events);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [isActive]);

  useEffect(() => {
    fetchEvents();
    return () => {
      isActive.current = false;
    };
  }, [fetchEvents]);

  const showDetailHandler = (eventId: string) => {
    const selectedEvent = events.find((e) => e._id === eventId);
    setSelectedEvent(selectedEvent!);
  };

  async function bookEventHandler() {
    if (!context?.token) {
      setSelectedEvent(null);
      return;
    }
    const bookEventQuery = bookEvent(selectedEvent?._id as string);
    try {
      const sendData = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookEventQuery),
      });
      if (sendData.status !== 200 && sendData.status !== 201) {
        throw new Error("Failed!");
      }
      const responseData = await sendData.json();
      console.log(responseData);
      setSelectedEvent(null);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {(creating || selectedEvent) && <Backdrop />}
      {creating && (
        <Modal
          title="Add Event"
          canCancel
          canConfirm
          onCancel={modalCancelHandler}
          onConfirm={modalConfirmHandler}
          confirmText="Confirm"
        >
          <form>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" ref={titleElRef} />
            </div>
            <div className="form-control">
              <label htmlFor="price">Price</label>
              <input type="number" id="price" ref={priceElRef} />
            </div>
            <div className="form-control">
              <label htmlFor="date">Date</label>
              <input type="datetime-local" id="date" ref={dateElRef} />
            </div>
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea id="description" rows={4} ref={descriptionElRef} />
            </div>
          </form>
        </Modal>
      )}
      {selectedEvent && (
        <Modal
          title={selectedEvent.title}
          canCancel
          canConfirm
          onCancel={modalCancelHandler}
          onConfirm={bookEventHandler}
          confirmText={context?.token ? "Book" : "Confirm"}
        >
          <h1>{selectedEvent.title}</h1>
          <h2>
            ${selectedEvent.price} -{" "}
            {new Date(selectedEvent.date).toLocaleDateString()}
          </h2>
          <p>{selectedEvent.description}</p>
        </Modal>
      )}
      {context?.token && (
        <div className="events-control">
          <p>Share your own Events!</p>
          <button className="btn" onClick={() => setCreating(true)}>
            Create Event
          </button>
        </div>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <EventList
          events={events}
          authUserId={context?.userId as string}
          onViewDetail={showDetailHandler}
        />
      )}
    </>
  );
}
