import { Helmet } from 'react-helmet-async';
// @mui

import axios from 'axios'; // Import Axios
import { Container, Typography } from '@mui/material';
import NewproductForm from '../sections/@dashboard/products/NewproductForm';

// --------------------------------------------------------------

export default function NewProductPage() {
  const handleFormSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/products', data, {
        withCredentials: true,
      });

      // Check if the request was successful
      if (response.status === 201) {
        // Optionally, you can handle success here, e.g., show a success message
        console.log('Product created successfully');
      } else {
        // Handle other status codes as needed
        console.error('Failed to create product');
      }
    } catch (error) {
      // Handle any errors that occurred during the request, e.g., network error
      console.error('Error creating product:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title> new product</title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          New Products
        </Typography>
        <NewproductForm onSubmit={handleFormSubmit} />
      </Container>
    </>
  );
}
