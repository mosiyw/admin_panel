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
  const [modalType, setModalType] = useState();

  const URL = "http://localhost:5000";

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  useEffect(() => {
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
      setCoverImage(selectedProduct.image?.cover || "");
      setDisplayImage(!!selectedProduct.image?.cover); // Check if cover image exists
      setGalleryImages(selectedProduct.image?.images || []); // Set gallery images
    } else if (!isEditing) {
      reset(); // Reset form when not in editing mode
      setDescription("");
      setDisplayImage(false); // Reset displayImage
      setGalleryImages([]); // Reset galleryImages
    }
  }, [isEditing, initialProductData, reset]);

  console.log(galleryImages);
  const handleFormSubmit = (data) => {
    // Include the description from the state in the form data
    data.description = description;
    data.image = { cover: coverImage, images: galleryImages };
    data.galleryImages = galleryImages;
    delete data["price.original"];
    delete data["price.discount"];
    onSubmit(data);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleImageUpload = (imageUrl) => {
    // Find the first empty index in galleryImages
    const emptyIndex = galleryImages.findIndex((image) => !image);

    // If there's an empty index, set the imageUrl at that index
    if (emptyIndex !== -1) {
      const updatedGalleryImages = [...galleryImages];
      updatedGalleryImages[emptyIndex] = imageUrl;
      setGalleryImages(updatedGalleryImages);
    } else {
      // If there's no empty index, append the imageUrl to the end of galleryImages
      setGalleryImages([...galleryImages, imageUrl]);
    }
  };
  const handleOpenModal = (props) => {
    setOpenModal(true);
    setModalType(props);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const ImageGalleryWithRef = React.forwardRef((props, ref) => <ImageGallery ref={ref} {...props} />);
  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Modal open={openModal} onClose={handleCloseModal}>
        {modalType === "cover" ? (
          <ImageGalleryWithRef setImage={setCoverImage} handleCloseModal={handleCloseModal} />
        ) : (
          <ImageGalleryWithRef setImage={handleImageUpload} handleCloseModal={handleCloseModal} />
        )}
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
              onClick={() => {
                if (!coverImage) {
                  handleOpenModal("cover");
                } else {
                  setCoverImage("");
                }
              }}
            >
              {coverImage ? (
                <div>
                  <img
                    src={coverImage ? URL + coverImage : null}
                    alt="Product Cover"
                    style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
                  />
                  <span className="replaceText">Delete Cover</span>
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
                onClick={() => {
                  if (!galleryImages[index - 1]) {
                    handleOpenModal("gallery");
                  } else {
                    // Create a new array without the item at the current index
                    const newGalleryImages = [...galleryImages];
                    newGalleryImages.splice(index - 1, 1);

                    // Update the galleryImages state
                    setGalleryImages(newGalleryImages);
                  }
                }}
                className="UploadButton"
                htmlFor={`gallery-image-upload-${index}`}
                disabled={index > galleryImages.length + 1}
                style={{ aspectRatio: "1/1" }}
              >
                {galleryImages[index - 1] ? (
                  <>
                    <img
                      src={URL + galleryImages[index - 1]}
                      alt="test"
                      style={{ maxWidth: "100%", maxHeight: "400px", objectFit: "cover" }}
                    />
                    <span className="replaceText">Delete Image</span>
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
              <ReactQuill
                modules={modules}
                value={description}
                onChange={handleDescriptionChange}
                style={{ height: "100%" }}
              />
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
