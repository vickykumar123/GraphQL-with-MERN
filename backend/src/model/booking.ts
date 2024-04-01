import mongoose, {Schema} from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {timestamps: true}
);
const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
