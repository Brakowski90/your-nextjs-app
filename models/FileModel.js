// import mongoose from "mongoose";

// const FileSchema = new mongoose.Schema({
//   filename: String,
//   fileUrl: String,
//   uploadedAt: { type: Date, default: Date.now },
// });

// export default mongoose.models.File || mongoose.model("File", FileSchema);
import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  fileUrl: { type: String, required: true },
});

const File = mongoose.models.File || mongoose.model("File", FileSchema);

export default File;
