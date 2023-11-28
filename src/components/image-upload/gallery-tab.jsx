import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import axios from "axios";

export default function GalleryTab({ results, setImage, handleCloseModal }) {
  const [searchTerm, setSearchTerm] = useState([]);
  const [items, setItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setItems(results);
  }, [results]);

  function handleSearch(event) {
    setSearchInput(event.target.value);
    axios
      .get(`http://localhost:5000/api/image-gallery/${event.target.value}`, { withCredentials: true })
      .then((response) => setItems(response.data))
      .catch((error) => {
        console.error("Error:", error);
        setItems([]);
      });
  }

  return (
    <div className="container">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            label="Search by title"
            variant="outlined"
            fullWidth
            onChange={handleSearch}
            value={searchInput}
            style={{ margin: "16px 0" }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} className="gridContainer">
        {Array.isArray(items) &&
          items.map((items, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                className="img-card"
                style={{ maxWidth: 345 }}
                onClick={() => {
                  setImage(`http://localhost:5000${items.imageUrl}`);
                  handleCloseModal();
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={`http://localhost:5000${items.imageUrl}`}
                  alt={items.title}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {items.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
