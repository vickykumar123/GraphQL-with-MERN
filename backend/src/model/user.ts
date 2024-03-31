import mongoose, {Schema} from "mongoose";
import {EventType, UserType} from "../types";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

const User = mongoose.model<UserType>("User", userSchema);
export default User;
