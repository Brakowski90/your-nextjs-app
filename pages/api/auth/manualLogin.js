// //pages/api/auth/manualLogin.js

// import { MongoClient } from "mongodb";
// import jwt from "jsonwebtoken";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   const { email, password } = req.body;

//   try {
//     const client = await MongoClient.connect(process.env.MONGODB_URI);
//     const db = client.db();
    
//     // Find user in the database
//     const user = await db.collection("allowedUsers").findOne({ email });

//     client.close();

//     if (!user) {
//       return res.status(401).json({ error: "User not found" });
//     }

//     // Direct password comparison (no hashing)
//     if (password !== user.password) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     // Generate a JWT token for the user
//     const token = jwt.sign(
//       { email: user.email, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
