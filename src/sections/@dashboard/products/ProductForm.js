import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid, Paper, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ProductForm = ({ initialProductData, onSubmit, isEditing }) => {
  const { handleSubmit, control, reset } = useForm();
  const [description, setDescription] = useState('');
  const [displayImage, setDisplayImage] = useState(false);

  useEffect(() => {
    // Set default values based on isEditing and initialProductData
    if (isEditing && initialProductData) {
      const selectedProduct = initialProductData.product;

      reset({
        name: selectedProduct.name || '',
        code: selectedProduct.code || '',
        'price.original': selectedProduct.price?.original || '',
        'price.discount': selectedProduct.price?.discount || '',
        balance: selectedProduct.balance || '',
        category: selectedProduct.category?.length > 0 ? selectedProduct.category[0] : '',
        isActive: selectedProduct.isActive || false,
      });
      setDescription(selectedProduct.description || '');
      setDisplayImage(!!selectedProduct.image?.cover); // Check if cover image exists
    } else {
      reset();
      setDescription('');
      setDisplayImage(false); // Reset displayImage
    }
  }, [isEditing, initialProductData]);

  const handleFormSubmit = (data) => {
    // Include the description from the state in the form data
    data.description = description;
    delete data['price.original'];
    delete data['price.discount'];
    onSubmit(data);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };
  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Typography variant="h6" gutterBottom>
        {isEditing ? 'Edit Product' : 'New Product'}
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {displayImage ? (
              <Grid item xs={2}>
                {/* Display cover image if it exists */}
                {initialProductData.product.image?.cover && (
                  <img
                    src={initialProductData.product.image.cover}
                    alt="Product Cover"
                    style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'cover' }}
                  />
                )}
              </Grid>
            ) : null}
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
              defaultValue="" // Set defaultValue here
              render={({ field }) => (
                <TextField {...field} label="Original Price" variant="outlined" fullWidth type="number" />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="price.discount"
              control={control}
              defaultValue="" // Set defaultValue here
              render={({ field }) => (
                <TextField {...field} label="Discount Price" variant="outlined" fullWidth type="number" />
              )}
            />
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
          </Grid>
          <Grid item xs={8}>
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
              name="isActive"
              control={control}
              defaultValue={false} // Set defaultValue for isActive
              render={({ field }) => (
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="is-active-label">Status</InputLabel>
                  <Select {...field} labelId="is-active-label" label="Status">
                    <MenuItem value>Active</MenuItem>
                    <MenuItem value={false}>Inactive</MenuItem>
                  </Select>
                </FormControl>
              )}
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
              {isEditing ? 'Edit Product' : 'Add Product'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ProductForm;
