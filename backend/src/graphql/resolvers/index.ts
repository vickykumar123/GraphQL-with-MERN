import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Booking from "../../model/booking";
import Event from "../../model/event";
import User from "../../model/user";
import {EventType, UserType} from "../../types";

export const resolver = {
  events: async () => {
    const allEvent = await Event.find().populate({
      path: "creator",
      populate: {
        path: "createdEvents",
      },
    });
    return allEvent;
  },
  booking: async () => {
    const allBooking = await Booking.find().populate([
      {
        path: "event",
        populate: "creator",
        model: "Event",
      },
      {path: "user", populate: "createdEvents", model: "User"},
    ]);
    return allBooking;
  },
  createEvent: async (args: {eventInput: EventType}) => {
    const data = {
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date!),
      creator: "66092fd8e2eb268d624c634d",
    };
    const event = await Event.create(data);
    const user = await User.findById("66092fd8e2eb268d624c634d");
    user?.createdEvents?.push(event);
    user?.save();
    console.log(event);
    return event;
  },
  createUser: async (args: {userInput: UserType}) => {
    const hashPassword = await bcrypt.hash(args.userInput.password!, 12);
    const data = {
      email: args.userInput.email,
      password: hashPassword,
    };

    const user = await User.create(data);
    user.password = undefined;
    return user;
  },
  getEventById: async (_id: string) => {
    const event = await Event.findById(_id);
    return event;
  },

  getUser: async (_id: string) => {
    const user = await User.findById(_id).populate("createdEvents");
    user!.password = undefined;
    return user;
  },

  bookEvent: async (args: {eventId: string}) => {
    const event = await Event.findOne({_id: args.eventId});
    const data = {
      user: "66092fd8e2eb268d624c634d",
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
  cancelBooking: async (args: {bookingId: string}) => {
    const booking = await Booking.findById(args.bookingId);
    await Booking.deleteOne({_id: args.bookingId});
    console.log(booking);
    return booking?.event;
  },
  login: async ({email, password}: {email: string; password: string}) => {
    const user = await User.findOne({email});
    if (!user) {
      throw new Error("User does not exist");
    }
    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch) {
      throw new Error("Email or Password doesn't match");
    }
    const token = jwt.sign({id: user?._id}, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    return {userId: user._id, token, tokenExpiration: 1};
  },
};
