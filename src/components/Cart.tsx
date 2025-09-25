import { useDispatch, useSelector } from "react-redux";
import 
  {Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Typography, Stack
} from "@mui/material";
import { selectCartCount, selectCartItems, selectCartTotal } from "../features/cart/cartSelectors"
import type { AppDispatch } from "../store/store";
import { Link } from "react-router-dom";
import { addToCart, clearCart, decreaseQuantity } from "../features/cart/cartSlice";
import { CheckoutButton } from "./CheckoutButton";
import { TestCardAlert } from "./TestCardAlert";
export function Cart() {
  const cartProducts = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch<AppDispatch>();
  const cartProductsQuantity = useSelector(selectCartCount);
  if (cartProducts.length === 0) return <h2>El carrito está vacío</h2>
  return (
    <>
      <h2>El carrito tiene {cartProductsQuantity} elementos</h2>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                    {product.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => dispatch(decreaseQuantity(product.id))}
                    sx={{ mr: 1 }}
                  >
                    -
                  </Button>
                  {product.quantity}
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => dispatch(addToCart(product))}
                    sx={{ ml: 1 }}
                  >
                    +
                  </Button>
                </TableCell>
                <TableCell>${product.price}</TableCell>
              </TableRow>
            ))}
            {/* Fila del total */}
            <TableRow>
              <TableCell colSpan={3} align="right">
                <Typography variant="subtitle1" fontWeight="bold">
                  Total
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  ${cartTotal}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button onClick={() => dispatch(clearCart())}>Vaciar carrito</Button>
      </TableContainer>
      <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
        <Button component={Link} to="/" variant="outlined">Seguir comprando</Button>
        <CheckoutButton />
      </Stack>
      <TestCardAlert />
    </>
  );
}