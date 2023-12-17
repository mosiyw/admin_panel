import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
// @mui

import { Container, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axios } from "../lib/axios"; // Import Axios
import ProductForm from "../sections/@dashboard/products/ProductForm";
import Iconify from "../components/iconify";

export default function NewProductPage() {
  const navigate = useNavigate(); // Get the navigation function

  const mutateCreateProduct = useMutation({
    mutationFn: (data) => axios.post("products", data),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError(error) {
      toast.error(error?.response?.data?.error);
    },
  });

  const handleBackClick = () => {
    navigate("/dashboard/products"); // Navigate to the desired route
  };

  return (
    <>
      <Helmet>
        <title>New Product</title>
      </Helmet>
      <Iconify
        icon="ep:back"
        width={24}
        height={24}
        style={{ cursor: "pointer", marginBottom: "2vh" }}
        onClick={handleBackClick} // Add the click handler here
      />
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          New Products
        </Typography>

        <ProductForm isLoading={mutateCreateProduct.isLoading} onSubmit={mutateCreateProduct.mutate} />
      </Container>
    </>
  );
}
