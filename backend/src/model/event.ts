import mongoose, {Schema} from "mongoose";
import {EventType} from "../types";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Event = mongoose.model<EventType>("Event", eventSchema);
export default Event;
