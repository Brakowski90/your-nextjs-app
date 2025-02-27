//models/User.js

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ["admin", "user"] },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
