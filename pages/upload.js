// import { useState } from "react";
// import Navbar from '../components/Navbar';

// export default function UploadPage() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a file!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch("http://localhost:3000/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       setMessage(data.message || `File uploaded: ${data.filePath}`);
//     } catch (error) {
//       console.error("Upload failed:", error);
//       setMessage("Upload failed. Please try again.");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div style={{ padding: "20px", textAlign: "center" }}>
//         <h2>Upload a File</h2>
//         <input type="file" onChange={handleFileChange} />
//         <button onClick={handleUpload} style={{ marginLeft: "10px" }}>Upload</button>
//         {message && <p>{message}</p>}
//       </div>
//     </>
//   );
// // }
// import { useState } from 'react';
// import Navbar from '../components/Navbar';

// export default function UploadPage() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert('Please select a file!');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch('http://localhost:3000/api/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();
//       setMessage(data.message || `File uploaded: ${data.filePath}`);
//     } catch (error) {
//       console.error('Upload failed:', error);
//       setMessage('Upload failed. Please try again.');
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div style={{ padding: '20px', textAlign: 'center' }}>
//         <h2>Upload a File</h2>
//         <input type="file" onChange={handleFileChange} />
//         <button onClick={handleUpload} style={{ marginLeft: '10px' }}>Upload</button>
//         {message && <p>{message}</p>}
//       </div>
//     </>
//   );
// }

import { useState } from "react";
import Navbar from "../components/Navbar";  // Import Navbar

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setMessage("✅ File uploaded successfully!");
    } else {
      setMessage("❌ Upload failed.");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
  <Navbar /> 
  <h1>Upload a File</h1>
  <input type="file" onChange={handleFileChange} />
  <button onClick={handleUpload}>Upload</button>
  <p>{message}</p>
</div>
  );
}
