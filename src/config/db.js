import mongoose from "mongoose";
import dns from "dns";

const connectDB = async () => {
  let uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("MONGO_URI is missing from environment variables.");
    process.exit(1);
  }

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
  } catch (dnsErr) {
    console.warn("Could not set custom DNS servers, using system default:", dnsErr.message);
  }

  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected successfully`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
