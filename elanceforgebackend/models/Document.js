import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
    },

    clientEmail: {
      type: String,
      required: true,
    },

    projectName: {
      type: String,
      required: true,
    },

    documentName: {
      type: String,
      required: true,
    },

    documentType: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    mimeType: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },

    fileData: {
      type: Buffer,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Document",
  documentSchema
);