// //pages/api/upload.js

// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import dbConnect from "../../config/db"; // Ensure this is correct
// import File from "../../models/FileModel";

// export const config = {
//   api: {
//     bodyParser: false, // Required for multer to handle file uploads
//   },
// };

// // Set up storage for multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = path.join(process.cwd(), "public/uploads"); // Ensure this folder exists
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// const handler = async (req, res) => {
//   console.log("🔹 Upload API hit!"); // Debug log

//   await dbConnect(); // Ensure database is connected

//   if (req.method === "POST") {
//     console.log("🔹 Processing POST request...");

//     upload.single("file")(req, res, async (err) => {
//       if (err) {
//         console.error("❌ Multer error:", err);
//         return res.status(500).json({ error: "File upload failed" });
//       }

//       console.log("✅ File received:", req.file);

//       try {
//         const newFile = new File({
//           filename: req.file.filename,
//           fileUrl: `/uploads/${req.file.filename}`, // Store relative path
//         });

//         await newFile.save();
//         console.log("✅ File saved to DB:", newFile);

//         return res.status(201).json({ message: "File uploaded successfully", file: newFile });
//       } catch (error) {
//         console.error("❌ MongoDB Save Error:", error);
//         return res.status(500).json({ error: "Database save failed" });
//       }
//     });
//   } else {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }
// };

// export default handler;

// pages/api/upload.js

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
        // Creating the new file object with filename, fileUrl, and timestamp
        const newFile = new File({
          filename: req.file.filename,
          fileUrl: `/uploads/${req.file.filename}`, // Store relative path
          timestamp: new Date(), // Save the upload timestamp
        });

        // Log the data that will be saved to the database
        console.log("📝 Data to be saved:", newFile);

        // Save the file info to the database
        await newFile.save();
        console.log("✅ File saved to DB:", newFile);

        // Return the response after successful file upload
        return res.status(201).json({
          message: "File uploaded successfully",
          file: newFile,
        });
      } catch (error) {
        console.error("❌ MongoDB Save Error:", error);
        return res.status(500).json({ error: "Database save failed" });
      }
    });
  } else {
    // If the request method is not POST, return an error
    return res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default handler;
