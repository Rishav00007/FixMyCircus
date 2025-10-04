import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  staffUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  department: {
    type: String,
    enum: ["pathway", "water", "garbage", "general"],
    required: true,
  },

  assignedComplaints: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
    },
  ],

  totalResolved: {
    type: Number,
    default: 0,
  },

  performanceRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
});

const Staff = mongoose.model("Staff", staffSchema);
export default Staff;
