import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function GalleryTab({ results, setCoverImage, handleCloseModal }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <div className="container">
      <TextField
        label="Search by title"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ margin: "16px 0" }}
      />
      <Grid container spacing={2} className="gridContainer">
        {Array.isArray(results) &&
          results.map((result, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                className="img-card"
                style={{ maxWidth: 345 }}
                onClick={() => {
                  setCoverImage(`http://localhost:5000${result.imageUrl}`);
                  handleCloseModal();
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={`http://localhost:5000${result.imageUrl}`}
                  alt={result.title}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {result.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
