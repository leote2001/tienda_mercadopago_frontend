import {  AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { selectCartCount } from "../features/cart/cartSelectors";

export function Navbar() {
  const cartItemsQuantity = useSelector(selectCartCount);
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        {/* Título */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Tienda
        </Typography>

        {/* Links de navegación */}
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <IconButton component={Link} to="/cart" color="inherit">
          <ShoppingCart />
          <Typography variant="body2" style={{ marginLeft: 4 }}>
            Carrito {cartItemsQuantity}
          </Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
