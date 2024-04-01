import {Request} from "express";
import Event from "../../model/event";
import {EventType} from "../../types";
import User from "../../model/user";

export const eventResolver = {
  events: async () => {
    const allEvent = await Event.find().populate({
      path: "creator",
      populate: {
        path: "createdEvents",
      },
    });
    return allEvent;
  },
  createEvent: async (args: {eventInput: EventType}, req: Request) => {
    if (!req.isAuth) {
      throw new Error("Unauthorized");
    }
    const data = {
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date!),
      creator: req.userId,
    };
    const event = await Event.create(data);
    const user = await User.findById(req.userId);
    user?.createdEvents?.push(event);
    user?.save();
    console.log(event);
    return event;
  },
  getEventById: async (_id: string) => {
    const event = await Event.findById(_id);
    return event;
  },
};
