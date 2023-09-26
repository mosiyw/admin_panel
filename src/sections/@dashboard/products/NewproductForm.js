import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid, Paper, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NewProductForm = ({ onSubmit }) => {
  const { handleSubmit, control, reset } = useForm();
  const [description, setDescription] = useState('');
  const [displayImage, setDisplayImage] = useState(false);

  const handleFormSubmit = (data) => {
    // Include the description from the state in the form data
    data.description = description;
    reset();
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Typography variant="h6" gutterBottom>
        New Product
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={2}>
          {displayImage ? (
            <Grid item xs={12}>
              {/* Image Gallery */}
              {/* You can display uploaded images here */}
              {/* Example: */}
              {/* <ImageGallery images={formData.image} /> */}
            </Grid>
          ) : null}
          <Grid item xs={12}>
            {/* Add Image Upload Component Here */}
            {/* You can use a file input to upload images */}
            <input type="file" accept="image/*" multiple style={{ display: 'none' }} />
            <Button variant="outlined" component="label" fullWidth htmlFor="image-upload">
              Upload Images
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Product Name" variant="outlined" fullWidth />}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="price.original"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Original Price" variant="outlined" fullWidth type="number" />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="price.discount"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Discount Price" variant="outlined" fullWidth type="number" />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Controller
                name="category"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} labelId="category-label" label="Category">
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Clothing">Clothing</MenuItem>
                    <MenuItem value="Home">Home</MenuItem>
                    {/* Add more categories as needed  */}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="balance"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Balance" variant="outlined" fullWidth type="number" />
              )}
            />

            <Controller
              name="code"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Code" variant="outlined" fullWidth />}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Description</Typography>
            <div style={{ height: '30vh', marginBottom: '8vh', marginTop: '2vh' }}>
              {' '}
              {/* Set the height to 30vh and add margin bottom */}
              <ReactQuill value={description} onChange={handleDescriptionChange} style={{ height: '100%' }} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default NewProductForm;
