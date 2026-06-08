import mongoose from "mongoose";

const milestoneSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    clientEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    assignedTo: {
      type: String,
      default: "",
      trim: true,
    },

    deadline: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High",
        "Urgent",
      ],
      default: "Medium",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Working",
        "Review",
        "Completed",
      ],
      default: "Pending",
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Milestone =
  mongoose.models.Milestone ||
  mongoose.model(
    "Milestone",
    milestoneSchema
  );

export default Milestone;