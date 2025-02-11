// // pages/dashboard.js
// import { useSession } from 'next-auth/react';

// export default function Dashboard() {
//   const { data: session } = useSession();

//   if (!session) {
//     return <div>You must be signed in to view this page.</div>;
//   }

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <p>Welcome to your dashboard, {session.user.name}!</p>
//     </div>
//   );
// // }
// import { useSession } from 'next-auth/react';
// import Navbar from '../components/Navbar';

// export default function Dashboard() {
//   const { data: session, status } = useSession();

//   // Show loading state while session is being checked
//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   // Redirect user if not logged in
//   if (!session) {
//     return <div>You must be signed in to view this page.</div>;
//   }

//   return (
//     <div>
//       <Navbar />
//       <h1>Dashboard</h1>
//       <p>Welcome to your dashboard, {session.user.name}!</p>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";

// export default function Dashboard() {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     fetchImages();
//   }, []);

//   const fetchImages = async () => {
//     try {
//       const response = await fetch("/api/files");
//       const data = await response.json();
//       setImages(data);
//     } catch (error) {
//       console.error("Failed to fetch images:", error);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div style={{ padding: "20px", textAlign: "center" }}>
//         <h2>Uploaded Images</h2>
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "10px", marginTop: "20px" }}>
//           {images.length === 0 ? (
//             <p>No images uploaded yet.</p>
//           ) : (
//             images.map((file) => (
//               <div key={file._id} style={{ border: "1px solid #ddd", padding: "5px", borderRadius: "8px" }}>
//                 <img src={file.fileUrl} alt={file.filename} style={{ width: "100%", borderRadius: "5px" }} />
//                 <p style={{ fontSize: "12px", marginTop: "5px" }}>{file.filename}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// import { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";  // Import the Navbar component

// export default function Dashboard() {
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     fetch("/api/files")
//       .then((res) => res.json())
//       .then((data) => setFiles(data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div>
//       <Navbar />  {/* Add the Navbar to the Dashboard */}
      
//       <h1 style={{ textAlign: "center", marginTop: "20px" }}>Uploaded Files</h1>
      
//       <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
//         {files.length > 0 ? (
//           files.map((file) => (
//             <div key={file._id} style={{ margin: 10 }}>
//               <img
//                 src={file.fileUrl}  // Display the image using fileUrl
//                 alt={file.filename}
//                 style={{ width: 100, height: 100, objectFit: "cover" }}
//               />
//               <p>{file.filename}</p>
//             </div>
//           ))
//         ) : (
//           <p>No files uploaded yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";

// export default function Dashboard() {
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     fetch("/api/files")
//       .then((res) => res.json())
//       .then((data) => setFiles(data))
//       .catch((err) => console.error(err));
//   }, []);

//   // Function to delete a file
//   const handleDelete = async (id) => {
//     const res = await fetch("/api/delete", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id }),
//     });

//     if (res.ok) {
//       setFiles(files.filter((file) => file._id !== id)); // Remove from state
//     } else {
//       console.error("Failed to delete file");
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <h1 style={{ textAlign: "center", marginTop: "20px" }}>Uploaded Files</h1>
//       <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
//         {files.length > 0 ? (
//           files.map((file) => (
//             <div key={file._id} style={{ margin: 10, textAlign: "center" }}>
//               <img
//                 src={file.fileUrl}
//                 alt={file.filename}
//                 style={{ width: 100, height: 100, objectFit: "cover" }}
//               />
//               <p>{file.filename}</p>
//               <button
//                 onClick={() => handleDelete(file._id)}
//                 style={{
//                   backgroundColor: "red",
//                   color: "white",
//                   border: "none",
//                   padding: "1px 2px",
//                   cursor: "pointer",
//                 }}
//               >
//                 X
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No files uploaded yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch("/api/files")
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this upload?");
    if (!confirmDelete) return;

    try {
      const res = await fetch("/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setFiles((prevFiles) => prevFiles.filter((file) => file._id !== id));
      } else {
        console.error("Failed to delete file");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Uploaded Files</h1>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {files.length > 0 ? (
          files.map((file) => (
            <div key={file._id} style={{ margin: 10, textAlign: "center" }}>
              <img
                src={file.fileUrl}
                alt={file.filename}
                style={{ width: 100, height: 100, objectFit: "cover" }}
              />
              <p>{file.filename}</p>
              <button onClick={() => handleDelete(file._id)} style={{ marginTop: 5 }}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
