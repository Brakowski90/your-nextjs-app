//models/FileModel.js

// import mongoose from "mongoose";

// const FileSchema = new mongoose.Schema({
//   filename: { type: String, required: true },
//   fileUrl: { type: String, required: true },
// });

// const File = mongoose.models.File || mongoose.model("File", FileSchema);

// export default File;

import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "", // Allows storing an editable description
  },
});

export default mongoose.models.File || mongoose.model("File", FileSchema);
