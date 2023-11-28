import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

export default function UploadTab({ setImage, handleCloseModal }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [displayedImage, setDisplayedImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", selectedFile); // Use selectedFile instead of displayedImage

    try {
      const response = await fetch("http://localhost:5000/api/image-gallery/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log(data);
      setImage(`http://localhost:5000${data.imageUrl}`);
      setTitle("");
      setSelectedFile(null);
      setDisplayedImage("");
      handleCloseModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleFileBoxClick = () => {
    // Trigger click on the hidden file input
    document.getElementById("fileInput").click();
  };

  const handleFileDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setSelectedFile(file);

      // Display the selected image
      const reader = new FileReader();
      reader.onload = (e) => {
        setDisplayedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      alert("Please select a valid jpg or png file.");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <TextField label="Title" variant="outlined" fullWidth value={title} onChange={handleTitleChange} />
      <div
        className="fileBox"
        onClick={handleFileBoxClick}
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
        style={{
          minHeight: "200px",
          border: "2px dashed #aaa",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {displayedImage ? (
          <img src={displayedImage} alt="Selected" style={{ maxWidth: "30%", maxHeight: "50%" }} />
        ) : (
          <p>Drag &amp; drop a file here or click to select</p>
        )}
      </div>
      <Input id="fileInput" type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} className="input" />
      <Button fullWidth variant="contained" color="primary" onClick={handleUpload} className="button">
        Upload
      </Button>
    </div>
  );
}
