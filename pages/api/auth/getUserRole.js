// //pages/api/auth/getUserRole.js

// import { getServerSession } from "next-auth";
// import { authOptions } from "./[...nextauth]";
// import { MongoClient } from "mongodb";

// export default async function handler(req, res) {
//   try {
//     const session = await getServerSession(req, res, authOptions);

//     if (!session) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const client = await MongoClient.connect(process.env.MONGODB_URI);
//     const db = client.db();
    
//     // Find user in the database
//     const user = await db.collection("allowedUsers").findOne({ email: session.user.email });

//     client.close();

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json({ role: user.role });
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
