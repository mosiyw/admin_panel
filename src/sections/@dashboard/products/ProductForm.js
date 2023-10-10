import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid, Paper, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

import '../../../styles/productForm.css';
import Iconify from '../../../components/iconify';

const ProductForm = ({ initialProductData, onSubmit, isEditing }) => {
  const { handleSubmit, control, reset } = useForm();
  const [description, setDescription] = useState('');
  const [displayImage, setDisplayImage] = useState(false);
  const [coverImage, setCoverImage] = useState();
  const [galleryImages, setGalleryImages] = useState([]);

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
      setGalleryImages(selectedProduct.image?.additional || []); // Set gallery images
    } else {
      reset();
      setDescription('');
      setDisplayImage(false); // Reset displayImage
      setGalleryImages([]); // Reset galleryImages
    }
  }, [isEditing, initialProductData]);

  const handleFormSubmit = (data) => {
    // Include the description from the state in the form data
    data.description = description;
    data.coverImage = coverImage;
    data.galleryImages = galleryImages;
    delete data['price.original'];
    delete data['price.discount'];
    onSubmit(data);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  // Cover upload handler
  const handleCoverUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const imageData = event.target.result;
      setCoverImage(imageData);
      setDisplayImage(true);
    };
  };

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const imageData = event.target.result;

      if (index === 0) {
        // If index is 0, set the cover image
        setCoverImage(imageData);
        setDisplayImage(true);
      } else {
        // If index is not 0, add the image to the gallery
        const updatedGalleryImages = [...galleryImages];
        updatedGalleryImages[index - 1] = imageData;
        setGalleryImages(updatedGalleryImages);
      }

      try {
        const response = await axios.post(
          `http://localhost:5000/api/products/${initialProductData.product._id}/upload-image`,
          {
            image: imageData,
            index,
          }
        );
        console.log('Image upload successful:', response.data);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Typography variant="h6" gutterBottom>
        {isEditing ? 'Edit Product' : 'New Product'}
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            {displayImage ? (
              <>
                {/* Display cover image if it exists */}
                {initialProductData.product.image?.cover ||
                  (coverImage && (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        style={{ display: 'none' }}
                        id="cover-image-upload"
                        onChange={(event) => handleCoverUpload(event, 0)}
                      />
                      <Button
                        variant="outlined"
                        className="UploadButton"
                        component="label"
                        fullWidth
                        htmlFor="cover-image-upload"
                        style={{ aspectRatio: '1/1', width: '100%' }}
                      >
                        <img
                          src={
                            initialProductData.product.image.cover ? initialProductData.product.image.cover : coverImage
                          }
                          alt="Product Cover"
                          style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
                        />
                        <span className="replaceText">Replace Cover</span>
                      </Button>
                    </>
                  ))}
              </>
            ) : (
              <>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                  id="cover-image-upload"
                  onChange={(event) => handleImageUpload(event, 0)}
                />
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  htmlFor="cover-image-upload"
                  style={{ aspectRatio: '1/1' }}
                >
                  <>
                    <Iconify icon="tabler:camera-plus" /> <span style={{ marginLeft: '8px' }}>Add Cover</span>
                  </>
                </Button>
              </>
            )}
            {/* Add Image Upload Components Here */}
            {/* You can use a file input to upload images */}
          </Grid>
          {[1, 2, 3, 4, 5].map((index) => (
            <Grid item xs={2} key={index}>
              <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                id={`gallery-image-upload-${index}`}
                onChange={(event) => handleImageUpload(event, index)}
              />
              <Button
                variant="outlined"
                component="label"
                fullWidth
                className="UploadButton"
                htmlFor={`gallery-image-upload-${index}`}
                disabled={!displayImage && index !== 1}
                style={{ aspectRatio: '1/1' }}
              >
                {galleryImages[index - 1] ? (
                  <>
                    <img
                      src={galleryImages[index - 1]}
                      alt="test"
                      style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'cover' }}
                    />
                    <span className="replaceText">Replace Image</span>
                  </>
                ) : (
                  <>
                    <Iconify icon="tabler:camera-plus" /> <span style={{ marginLeft: '8px' }}>Add Image</span>
                  </>
                )}
              </Button>
            </Grid>
          ))}
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
          <Grid item xs={4}>
            <Controller
              name="code"
              control={control}
              defaultValue="" // Set defaultValue here
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
              {isEditing ? 'Edit Product' : 'Add Product'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ProductForm;
