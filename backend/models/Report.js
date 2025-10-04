import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // usually admin
  },

  generatedDate: {
    type: Date,
    default: Date.now,
  },

  complaints: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
    },
  ],

  totalComplaints: Number,
  resolvedCount: Number,
  pendingCount: Number,

  reportFileURL: String, // if stored as downloadable file (PDF/CSV)
});

const Report = mongoose.model("Report", reportSchema);
export default Report;
