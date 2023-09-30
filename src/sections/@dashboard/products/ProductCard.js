import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { Card, Typography, Stack, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Label from '../../../components/label';
import { fCurrency } from '../../../utils/formatNumber';

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

ShopProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.object,
    image: PropTypes.object,
    code: PropTypes.string,
    balance: PropTypes.number,
  }),
};

export default function ShopProductCard({ product }) {
  const { name, _id, price, image, code, balance } = product;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {price.discount && (
          <Label
            variant="filled"
            color="error"
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
              textDecoration: 'line-through',
            }}
          >
            {fCurrency(price.original)}
          </Label>
        )}
        <StyledProductImg alt={name} src={image.cover} />
      </Box>
      <Stack spacing={2} sx={{ p: 3 }}>
        {/* Wrap the product name with a Link */}
        <Link to={`editproduct/${_id}`} style={{ textDecoration: 'none' }}>
          <Typography variant="subtitle2" noWrap style={{ direction: 'rtl' }}>
            {name}
          </Typography>
        </Link>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">Code :</Typography>
          <Typography variant="subtitle2">{code}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">Price :</Typography>
          <Typography variant="subtitle2">
            &nbsp;
            {fCurrency(price.discount ? price.discount : price.original)}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2">Balance :</Typography>
          <Typography variant="subtitle2">{balance}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
