import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { name, cover, price, priceSale } = product;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {priceSale && (
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
            {priceSale && fCurrency(priceSale)}
          </Label>
        )}
        <StyledProductImg alt={name} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">Code :</Typography>
          <Typography variant="subtitle1">{price}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">Price :</Typography>
          <Typography variant="subtitle2">
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2">Balance :</Typography>
          <Typography variant="subtitle2">{10}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
