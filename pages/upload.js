//pages/upload.js

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
