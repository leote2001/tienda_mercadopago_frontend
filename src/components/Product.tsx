import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, selectProductsError, selectProductsStatus } from "../features/products/productsSelectors";
import type { AppDispatch } from "../store/store";
import { useEffect } from "react";
import { getProductById} from "../features/products/productsSlice";
import { useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";
import { selectCartItems } from "../features/cart/cartSelectors";
export function Product() {
  const {productId} = useParams(); 
  const product = useSelector(selectProduct);
  const productStatus = useSelector(selectProductsStatus);
  const productError = useSelector(selectProductsError);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
      dispatch(getProductById(Number(productId)));
  }, [dispatch, productId]);
  if (productStatus === "loading") return <p>Cargando...</p>
  if (productStatus === "failed") return <p>{productError}</p>
  return (
    <>
    {product &&
    <Card
      sx={{
        maxWidth: 345,
        m: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: "contain", p: 2 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: "bold" }}>
          ${product.price}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Category: {product.category}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => dispatch(addToCart(product))} size="small" variant="contained">
          Añadir al carrito
        </Button>
        {cartItems.find(ci => ci.id === product.id) &&
        <Button onClick={() => dispatch(removeFromCart(product.id))} size="small" variant="contained">
        Quitar del carrito
      </Button>
        }
      </CardActions>
    </Card>
    }
    </>
  );
}