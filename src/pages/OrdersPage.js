import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Container, Stack, Typography, Button, OutlinedInput, InputAdornment, Card } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Iconify from '../components/iconify';
import OrderTable from '../sections/@dashboard/orders/OrderTable';

// Define a mock orders data structure (replace with your actual data)
const ORDERLIST = [
  {
    id: 1,
    customerName: 'John Doe',
    date: '2023-09-28',
    status: 'Pending',
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    date: '2023-09-27',
    status: 'Shipped',
  },
  // Add more orders as needed
];

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

export default function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders data from the API (replace with your API endpoint)
    async function fetchOrders() {
      try {
        const response = await fetch('http://localhost:5000/api/orders'); // Adjust the URL to match your API endpoint
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error('Failed to fetch orders data');
        }
      } catch (error) {
        console.error('Error fetching orders data:', error);
      }
    }

    fetchOrders();
  }, []);

  const handleNewOrderClick = () => {
    // Navigate to the new order page (adjust the route as needed)
    navigate('/dashboard/neworder');
  };

  const handleStatusChange = (orderId, newStatus) => {
    // Update the order status (you should implement the actual API call here)
    // Example:
    // const updatedOrders = orders.map((order) =>
    //   order.id === orderId ? { ...order, status: newStatus } : order
    // );
    // setOrders(updatedOrders);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Orders | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Orders
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleNewOrderClick}>
            New Order
          </Button>
        </Stack>

        <Card>
          <StyledSearch
            placeholder="Search Order..."
            style={{ margin: '4vh' }}
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            }
          />
          <OrderTable orders={ORDERLIST} onStatusChange={handleStatusChange} />
        </Card>
      </Container>
    </>
  );
}
