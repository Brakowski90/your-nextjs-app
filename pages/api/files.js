import connectDB from "../../config/db";
import File from "../../models/FileModel";

connectDB(); // Ensure database connection

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const files = await File.find().sort({ uploadedAt: -1 }); // Get all files, sorted by newest
      res.status(200).json(files);
    } catch (error) {
      res.status(500).json({ message: "Error fetching images", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
