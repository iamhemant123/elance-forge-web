import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

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
    },

    amount: {
      type: Number,
      required: true,
    },

    method: {
      type: String,
      default: "Online",
    },

    notes: {
      type: String,
      default: "",
    },

    currency: {
      type: String,
      default: "INR",
    },

    razorpayOrderId: {
      type: String,
      required: true,
    },

    razorpayPaymentId: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    paidAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Payment =
  mongoose.models.Payment ||
  mongoose.model(
    "Payment",
    paymentSchema
  );

export default Payment;