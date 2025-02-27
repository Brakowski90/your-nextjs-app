// //pages/api/delete.js

import fs from "fs";
import path from "path";
import File from "../../models/FileModel";
import dbConnect from "../../config/db";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await dbConnect();

  try {
    const { id } = req.body;

    // Find file in MongoDB
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ message: "File not found in database" });
    }

    // Construct file path
    const filePath = path.join(process.cwd(), "public", file.fileUrl);

    // Check if file exists before deleting
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Use synchronous method to avoid async issues
      console.log(`✅ File deleted: ${filePath}`);
    } else {
      console.warn(`⚠️ File not found: ${filePath}`);
    }

    // Remove file from MongoDB
    await File.findByIdAndDelete(id);
    return res.status(200).json({ message: "File deleted successfully" });

  } catch (error) {
    console.error("❌ Delete error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
