import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
// @mui

import axios from 'axios'; // Import Axios
import { Container, Typography } from '@mui/material';
import ProductForm from '../sections/@dashboard/products/ProductForm';
import Iconify from '../components/iconify';

// --------------------------------------------------------------

export default function NewProductPage() {
  const navigate = useNavigate(); // Get the navigation function
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

  const handleBackClick = () => {
    navigate('/dashboard/products'); // Navigate to the desired route
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
        style={{ cursor: 'pointer', marginBottom: '2vh' }}
        onClick={handleBackClick} // Add the click handler here
      />
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          New Products
        </Typography>
        <ProductForm onSubmit={handleFormSubmit} />
      </Container>
    </>
  );
}
