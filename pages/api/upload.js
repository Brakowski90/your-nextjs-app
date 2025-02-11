// import multer from "multer";
// import path from "path";
// import connectDB from "../../config/db";
// import File from "../../models/FileModel";

// connectDB(); // Ensure database connection

// // Set up storage
// const storage = multer.diskStorage({
//   destination: "./public/uploads",
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     upload.single("file")(req, res, async (err) => {
//       if (err) {
//         return res.status(500).json({ message: "Upload failed", error: err });
//       }
//       const fileData = new File({
//         filename: req.file.filename,
//         fileUrl: `/uploads/${req.file.filename}`,
//       });
//       await fileData.save();
//       return res.status(200).json({ message: "File uploaded", fileUrl: fileData.fileUrl });
//     });
//   } else {
//     return res.status(405).json({ message: "Method not allowed" });
//   }
// }

// import nextConnect from "next-connect";
// import multer from "multer";
// import path from "path";
// import { File } from "../../models/FileModel"; // Updated import
// import fs from "fs";

// // Setup multer storage to store files locally
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Ensure the 'uploads' folder exists
//     const dir = "./public/uploads";
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir);
//     }
//     cb(null, dir); // Save files to 'uploads' folder
//   },
//   filename: (req, file, cb) => {
//     // Use original file name
//     cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid overwriting
//   },
// });

// // File filter (Optional)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type'), false); // Reject file if type is not allowed
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
//   fileFilter: fileFilter,
// });

// const handler = nextConnect();

// handler.use(upload.single("file")); // For single file upload, 'file' is the field name

// handler.post(async (req, res) => {
//   try {
//     // Create a new File entry in MongoDB
//     const file = new File({
//       filename: req.file.filename,
//       fileUrl: `/uploads/${req.file.filename}`, // URL where the file is accessible
//     });

//     await file.save(); // Save file record to MongoDB

//     // Send back a response with the file URL and success message
//     res.status(200).json({ message: "File uploaded successfully!", fileUrl: file.fileUrl });
//   } catch (error) {
//     console.error("Error saving file:", error);
//     res.status(500).json({ message: "Upload failed, please try again." });
//   }
// });

// export default handler;

import multer from "multer";
import path from "path";
import fs from "fs";
import dbConnect from "../../config/db"; // Ensure this is correct
import File from "../../models/FileModel";

export const config = {
  api: {
    bodyParser: false, // Required for multer to handle file uploads
  },
};

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), "public/uploads"); // Ensure this folder exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

const handler = async (req, res) => {
  console.log("🔹 Upload API hit!"); // Debug log

  await dbConnect(); // Ensure database is connected

  if (req.method === "POST") {
    console.log("🔹 Processing POST request...");

    upload.single("file")(req, res, async (err) => {
      if (err) {
        console.error("❌ Multer error:", err);
        return res.status(500).json({ error: "File upload failed" });
      }

      console.log("✅ File received:", req.file);

      try {
        const newFile = new File({
          filename: req.file.filename,
          fileUrl: `/uploads/${req.file.filename}`, // Store relative path
        });

        await newFile.save();
        console.log("✅ File saved to DB:", newFile);

        return res.status(201).json({ message: "File uploaded successfully", file: newFile });
      } catch (error) {
        console.error("❌ MongoDB Save Error:", error);
        return res.status(500).json({ error: "Database save failed" });
      }
    });
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default handler;
