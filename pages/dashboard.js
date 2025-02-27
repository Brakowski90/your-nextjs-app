// pages/dashboard.js

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [hoveredFile, setHoveredFile] = useState(null); // Track hovered file ID

  useEffect(() => {
    fetch("/api/files")
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this upload?")) return;

    try {
      const res = await fetch("/api/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
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

      <div style={styles.gridContainer}>
        {files.length > 0 ? (
          files.map((file) => (
            <div
              key={file._id}
              style={styles.imageContainer}
              onMouseEnter={() => setHoveredFile(file._id)}
              onMouseLeave={() => setHoveredFile(null)}
            >
              <img src={file.fileUrl} alt="Uploaded" style={styles.image} />
              {hoveredFile === file._id && (
                <div style={styles.overlay}>
                  <a href={file.fileUrl} download style={styles.button}>
                    Download
                  </a>
                  <button onClick={() => handleDelete(file._id)} style={styles.button}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No files uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "15px",
    padding: "20px",
    justifyContent: "center",
  },
  imageContainer: {
    position: "relative",
    width: "120px",
    height: "120px",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    padding: "5px",
  },
  button: {
    padding: "6px 10px",
    fontSize: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s ease",
    textDecoration: "none",
    textAlign: "center",
  },
};

export default Dashboard;
