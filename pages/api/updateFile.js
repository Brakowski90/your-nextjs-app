//pages/api/updateFile.js

// import dbConnect from "../../config/db";
// import File from "../../models/FileModel";

// export default async function handler(req, res) {
//   await dbConnect();

//   if (req.method === "PUT") {
//     const { fileId, description } = req.body;

//     try {
//       const updatedFile = await File.findByIdAndUpdate(
//         fileId,
//         { description },
//         { new: true }
//       );

//       if (!updatedFile) {
//         return res.status(404).json({ error: "File not found" });
//       }

//       return res.status(200).json({ message: "Description updated", file: updatedFile });
//     } catch (error) {
//       return res.status(500).json({ error: "Failed to update description" });
//     }
//   } else {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }
// }
