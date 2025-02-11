// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB Connected");
//   } catch (error) {
//     console.error("MongoDB Connection Failed", error);
//     process.exit(1);
//   }
// };

// export default connectDB;

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    console.log("MongoDB URI:", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed", error);
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB connected successfully!");
});
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected.");
});

export default connectDB;
