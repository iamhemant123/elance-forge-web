import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },

    clientName: {
      type: String,
      required: true,
    },

    clientEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    deadline: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Review",
        "Completed",
      ],
      default: "Pending",
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

    progress: {
      type: Number,
      default: 0,
    },

    // PAYMENT FIELDS

    budget: {
      type: Number,
      default: 0,
    },

    paidAmount: {
      type: Number,
      default: 0,
    },

    remainingAmount: {
      type: Number,
      default: 0,
    },

    notes: {
      type: String,
      default: "",
    },

    team: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Project =
  mongoose.models.Project ||
  mongoose.model(
    "Project",
    projectSchema
  );

export default Project;