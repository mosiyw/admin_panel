/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import ShopProductCard from "./ProductCard";

function ProductList({ products }) {
  return (
    <Grid container spacing={3}>
      {products?.map((product) => (
        <Grid key={product._id} item xs={12} sm={6} md={4} xl={3}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

ProductList.propTypes = {
  products: PropTypes.array,
};

export default ProductList;
