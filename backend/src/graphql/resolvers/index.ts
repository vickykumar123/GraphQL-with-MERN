import Event from "../../model/event";
import User from "../../model/user";
import {EventType, UserType} from "../../types";
import bcrypt from "bcryptjs";

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
};
