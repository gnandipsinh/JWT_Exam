import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    return true;
  } catch (error) {
    console.log("DB Error:", error.message);

    return false;
  }
};

export default connectDB;
