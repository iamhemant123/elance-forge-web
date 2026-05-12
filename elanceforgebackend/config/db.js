import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Check Mongo URI
    if (!process.env.MONGO_URI) {
      throw new Error("MongoDB URI is missing");
    }

    // Connect Database
    const dbConnection = await mongoose.connect(
      process.env.MONGO_URI,
      {
        serverSelectionTimeoutMS: 5000,
      }
    );

    console.log(
      `Database Connected : ${dbConnection.connection.host}`
    );

    // Connection Events
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB Disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB Reconnected");
    });

  } catch (error) {
    console.error(
      "Database Connection Error :",
      error.message
    );

    process.exit(1);
  }
};

export default connectDB;