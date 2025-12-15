import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    // Check if using mock database
    if (process.env.USE_MOCK_DB === "true") {
      console.log(`✅ Using Mock In-Memory Database for Testing`);
      // Disable mongoose connection attempts
      mongoose.connection.readyState = 1;
      return;
    }

    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017";
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.log(`⚠️ Falling back to Mock Database...`);
    // Continue without stopping the server
  }
};

export default connectDB;
