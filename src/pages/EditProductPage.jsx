import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests
import ProductForm from "../sections/@dashboard/products/ProductForm";

function EditProductPage() {
  const { id } = useParams(); // Get the product ID from the URL parameter
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    // Fetch product data based on the product ID from the URL when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`); // Replace with your API endpoint
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleEditProduct = async (editedProductData) => {
    console.log(editedProductData);
    try {
      // Send a PUT request to update the product with the edited data
      await axios.put(`http://localhost:5000/api/products/${id}`, editedProductData, {
        withCredentials: true,
      }); // Replace with your API endpoint
      // Redirect to the product details page or another appropriate page
      navigate(`/dashboard/products`);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      {productData && <ProductForm initialProductData={productData} onSubmit={handleEditProduct} isEditing />}
    </div>
  );
}

export default EditProductPage;
