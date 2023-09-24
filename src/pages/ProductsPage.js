import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

// @mui

import { styled, alpha } from '@mui/material/styles';
import { Container, Stack, Typography, Button, OutlinedInput, InputAdornment } from '@mui/material';
// components
import { ProductList } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import Iconify from '../components/iconify';

// ----------------------------------------------------------------------

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

export default function ProductsPage() {
  const navigate = useNavigate();

  const handleNewProductClick = () => {
    // Navigate to the /newproduct route
    navigate('/dashboard/newproduct');
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
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
            />
            <Button variant="contained" color="success">
              Search
            </Button>
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

        <ProductList products={PRODUCTS} />
      </Container>
    </>
  );
}
