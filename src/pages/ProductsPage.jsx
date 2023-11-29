import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
// @mui
import { styled, alpha } from "@mui/material/styles";
import { Container, Stack, Typography, Button, OutlinedInput, InputAdornment } from "@mui/material";
// components
import { useQuery } from "@tanstack/react-query";
import { ProductList } from "../sections/@dashboard/products";
// mock
import Iconify from "../components/iconify";
import { getProductsList } from "../api/products";

// ----------------------------------------------------------------------

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

export default function ProductsPage() {
  const productsList = useQuery({ queryKey: ["products-list"], queryFn: getProductsList });
  const [searchWord, setSearchWord] = useState("");
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const handleNewProductClick = () => {
    // Navigate to the /newproduct route
    navigate("/dashboard/newproduct");
  };

  useEffect(() => {
    if (productsList.isSuccess) {
      setProducts(productsList.data);
    }
  }, [productsList.isSuccess, productsList.data]);

  const fetchProducts = async () => {
    const response = await axios.get(`http://localhost:5000/api/products/admin/search?Keyword=${searchWord}`, {
      withCredentials: true,
    });
    setProducts(response.data);
  };
  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <StyledSearch
              placeholder="Search Product..."
              value={searchWord}
              onChange={(e) => {
                setSearchWord(e.target.value);
                fetchProducts();
              }}
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: "text.disabled", width: 20, height: 20 }} />
                </InputAdornment>
              }
            />
          </Stack>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleNewProductClick}
            >
              New Product
            </Button>
          </Stack>
        </Stack>
        <ProductList products={products} />
      </Container>
    </>
  );
}
