/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Modal,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

import "../../../styles/productForm.css";
import Iconify from "../../../components/iconify";
import ImageGallery from "../../../components/image-upload/imageUpload";

function ProductForm({ initialProductData, onSubmit, isEditing }) {
  const { handleSubmit, control, reset } = useForm();
  const [description, setDescription] = useState("");
  const [displayImage, setDisplayImage] = useState(false);
  const [coverImage, setCoverImage] = useState();
  const [galleryImages, setGalleryImages] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    // Set default values based on isEditing and initialProductData
    if (isEditing && initialProductData) {
      const selectedProduct = initialProductData.product;

      reset({
        name: selectedProduct.name || "",
        code: selectedProduct.code || "",
        "price.original": selectedProduct.price?.original || "",
        "price.discount": selectedProduct.price?.discount || "",
        balance: selectedProduct.balance || "",
        category: selectedProduct.category?.length > 0 ? selectedProduct.category[0] : "",
        isActive: selectedProduct.isActive || false,
      });
      setDescription(selectedProduct.description || "");
      setDisplayImage(!!selectedProduct.image?.cover); // Check if cover image exists
      setGalleryImages(selectedProduct.image?.additional || []); // Set gallery images
    } else {
      reset();
      setDescription("");
      setDisplayImage(false); // Reset displayImage
      setGalleryImages([]); // Reset galleryImages
    }
  }, [isEditing, initialProductData]);

  const handleFormSubmit = (data) => {
    // Include the description from the state in the form data
    data.description = description;
    data.image = { cover: coverImage };
    data.galleryImages = galleryImages;
    delete data["price.original"];
    delete data["price.discount"];
    onSubmit(data);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const imageData = event.target.result;
      const updatedGalleryImages = [...galleryImages];
      updatedGalleryImages[index - 1] = imageData;
      setGalleryImages(updatedGalleryImages);
    };

    reader.readAsDataURL(file);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    console.log(coverImage);
  };
  const ImageGalleryWithRef = React.forwardRef((props, ref) => <ImageGallery ref={ref} {...props} />);
  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Modal open={openModal} onClose={handleCloseModal}>
        <ImageGalleryWithRef setCoverImage={setCoverImage} handleCloseModal={handleCloseModal} />
      </Modal>
      <Typography variant="h6" gutterBottom>
        {isEditing ? "Edit Product" : "New Product"}
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              className="UploadButton"
              style={{ aspectRatio: "1/1" }}
              onClick={handleOpenModal}
            >
              {initialProductData?.product?.image?.cover || coverImage ? (
                <div>
                  <img
                    src={
                      coverImage || initialProductData?.product?.image?.cover
                        ? coverImage || initialProductData?.product?.image?.cover
                        : null
                    }
                    alt="Product Cover"
                    style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
                  />
                  <span className="replaceText">Replace Cover</span>
                </div>
              ) : (
                <>
                  <Iconify icon="tabler:camera-plus" /> <span style={{ marginLeft: "8px" }}>Add Cover</span>
                </>
              )}
            </Button>
          </Grid>
          {[1, 2, 3, 4, 5].map((index) => (
            <Grid item xs={2} key={index}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                className="UploadButton"
                htmlFor={`gallery-image-upload-${index}`}
                disabled={!displayImage && index !== 1}
                style={{ aspectRatio: "1/1" }}
              >
                {galleryImages[index - 1] ? (
                  <>
                    <img
                      src={galleryImages[index - 1]}
                      alt="test"
                      style={{ maxWidth: "100%", maxHeight: "400px", objectFit: "cover" }}
                    />
                    <span className="replaceText">Replace Image</span>
                  </>
                ) : (
                  <>
                    <Iconify icon="tabler:camera-plus" /> <span style={{ marginLeft: "8px" }}>Add Image</span>
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
            <div style={{ height: "30vh", marginBottom: "8vh", marginTop: "2vh" }}>
              {" "}
              {/* Set the height to 30vh and add margin bottom */}
              <ReactQuill value={description} onChange={handleDescriptionChange} style={{ height: "100%" }} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {isEditing ? "Edit Product" : "Add Product"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default ProductForm;
