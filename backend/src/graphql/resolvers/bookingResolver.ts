import {Request} from "express";
import Booking from "../../model/booking";
import Event from "../../model/event";

export const bookingResolver = {
  booking: async () => {
    const allBooking = await Booking.find().populate([
      {
        path: "event",
        populate: "creator",
        model: "Event",
      },
      {path: "user", populate: "createdEvents", model: "User"},
    ]);
    console.log(allBooking);
    return allBooking;
  },
  bookEvent: async (args: {eventId: string}, context: {req: Request}) => {
    if (!context.req.isAuth) {
      throw new Error("Unauthorized");
    }
    const event = await Event.findOne({_id: args.eventId});
    const data = {
      user: context.req.userId,
      event,
    };
    const booking = await (
      await Booking.create(data)
    ).populate([
      {
        path: "event",
        populate: "creator",
        model: "Event",
      },
      {path: "user", populate: "createdEvents", model: "User"},
    ]);
    return booking;
  },
  cancelBooking: async (args: {bookingId: string}, req: Request) => {
    if (!req.isAuth) {
      throw new Error("Unauthorized");
    }
    const booking = await Booking.findById(args.bookingId);
    await Booking.deleteOne({_id: args.bookingId});
    console.log(booking);
    return booking?.event;
  },
};
