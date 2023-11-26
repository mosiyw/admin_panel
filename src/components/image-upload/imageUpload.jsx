/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// ImageGallery.js
import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./imageGallery.css";
import GalleryTab from "./gallery-tab";
import UploadTab from "./upload-tab";
import { useEffect } from "react";

function ImageGallery({ setCoverImage, handleCloseModal }) {
  const [value, setValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/image-gallery", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        setSearchTerm(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchImages();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="main-container">
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Gallery" />
        <Tab label="Upload" />
      </Tabs>
      <div role="tabpanel" hidden={value !== 0}>
        {value === 0 && (
          <GalleryTab results={searchTerm} setCoverImage={setCoverImage} handleCloseModal={handleCloseModal} />
        )}
      </div>
      <div role="tabpanel" hidden={value !== 1}>
        {value === 1 && <UploadTab />}
      </div>
    </div>
  );
}

export default ImageGallery;
