/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import {
  Container,
  Stack,
  Typography,
  Button,
  OutlinedInput,
  InputAdornment,
  Box,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ProductList } from "../sections/@dashboard/products";
import Iconify from "../components/iconify";
import { getProductsList } from "../api/products";
import { useDebouncedState } from "../hooks/useDebounceState";

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
  const [searchWord, setSearchWord] = useDebouncedState("", 200);

  const productsList = useQuery({
    queryKey: ["products-list", searchWord],
    queryFn: () =>
      getProductsList({
        params: {
          Keyword: searchWord || undefined,
        },
      }),
  });

  const navigate = useNavigate();

  const handleNewProductClick = () => {
    navigate("/dashboard/newproduct");
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Products </title>
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
              onChange={(e) => {
                setSearchWord(e.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon={searchWord.length > 1 ? "lucide:x" : "eva:search-fill"}
                    sx={{ color: "text.disabled" }}
                  />
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

        {productsList.isLoading && (
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <CircularProgress color="inherit" />
          </Box>
        )}
        <ProductList key="Chad" products={productsList.data} />
      </Container>
    </>
  );
}
