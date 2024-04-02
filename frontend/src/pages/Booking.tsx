import {useEffect, useState} from "react";
import {cancelUserBooking, userBooking} from "../graphQL/query";
import {API_URL} from "../apiUrl";
import Spinner from "../components/Spinner/Spinner";
import BookingsControl from "../components/Booking/BookingControls/BookingControls";
import BookingList from "../components/Booking/BookingList/BookingList";
import BookingsChart from "../components/Booking/BookingChart/BookingChart";

export default function Booking() {
  const [isLoading, setIsLoading] = useState(false);
  const [booking, setBooking] = useState([]);
  const [outputType, setOutputType] = useState("list");
  console.log(booking);

  const fetchBooking = async () => {
    try {
      setIsLoading(true);
      const userBookingQuery = userBooking();
      const sendData = await fetch(`${API_URL}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userBookingQuery),
      });
      const responseData = await sendData.json();
      console.log(responseData);
      setBooking(responseData.data.booking);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  const deleteBookingHandler = async (bookingId: string) => {
    try {
      setIsLoading(true);
      const cancelUserBookingQuery = cancelUserBooking(bookingId);
      const sendData = await fetch(`${API_URL}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cancelUserBookingQuery),
      });
      if (sendData.status !== 200 && sendData.status !== 201) {
        throw new Error("Failed!");
      }
      //   const responseData = await sendData.json();
      setBooking((prevState) =>
        prevState.filter((booking) => booking._id !== bookingId)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const changeOutputTypeHandler = () => {
    if (outputType === "list") setOutputType("list");
    else setOutputType("chart");
  };

  if (isLoading) return <Spinner />;

  return (
    <div>
      <BookingsControl
        activeOutputType={outputType}
        onChange={changeOutputTypeHandler}
      />
      <div>
        {outputType === "list" ? (
          <BookingList bookings={booking} onDelete={deleteBookingHandler} />
        ) : (
          <BookingsChart bookings={booking} />
        )}
      </div>
    </div>
  );
}
