import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  citizen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  type: {
    type: String,
    required: true,
    enum: ["pathway", "water", "garbage", "other"],
  },

  description: {
    type: String,
    required: true,
  },

  photo: {
    type: String, // URL (via Cloudinary or local uploads)
  },

  location: {
    latitude: Number,
    longitude: Number,
    address: String,
  },

  status: {
    type: String,
    enum: ["OPEN", "IN_PROGRESS", "RESOLVED"],
    default: "OPEN",
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    default: null,
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },

  resolutionNote: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },

  dueDate: {
    type: Date
  },

  resolvedAt: {
    type: Date
  },

  slaBreached: {
    type: Boolean,
    default: false
  },

  escalated: { 
    type: Boolean, 
    default: false 
  },
  
  escalationLevel: { 
    type: Number, 
    default: 0 
  }, // e.g., 0=normal, 1=supervisor, 2=admin


});

// Update timestamp when complaint changes
complaintSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;
