import { getAllProducts } from "../features/products/productsSlice";
import { useEffect, useState } from "react";
import {
  Pagination,
  Card,
  CardContent,
  CardActions,
  Typography,
  CircularProgress,
  Button,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, selectProductsError, selectProductsStatus } from "../features/products/productsSelectors";
import type { AppDispatch } from "../store/store";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import {FiltersComponent} from "./FiltersComponent";
import { useFilteredProducts, type Filters } from "../hooks/useFilteredProducts";
import { selectCartItems } from "../features/cart/cartSelectors";
export function Home() {
  const [filters, setFilters] = useState<Filters>({
    category: "",
    priceRange: [0, 1000],
    search: ""
  });
  const itemsPerPage = 6;
  const [page, setPage] = useState(1);
  const products = useSelector(selectProducts);
  const categories = Array.from(new Set(products.map(p => p.category)));
  const lastIndex = page * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const filteredProducts = useFilteredProducts(products, filters);
  const currentProducts = filteredProducts.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const productsError = useSelector(selectProductsError);
  const productsStatus = useSelector(selectProductsStatus);
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(selectCartItems);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  useEffect(() => {
    setPage(1);
  }, [filters]);
  if (productsStatus === "loading") {
    return (
      <Container sx={{ textAlign: "center", marginTop: 5 }}>
        <CircularProgress />
      </Container>
    );
  }
  if (productsStatus === "failed") return <p>{productsError}</p>
  return (
    <>
    <h2>Filtros</h2>
    <FiltersComponent filters={filters} setFilters={setFilters} categories={categories} />
      {filteredProducts.length === 0 ? <p>No hay productos</p>
        :
        <>
        <div style={{ padding: "20px" }}>
    <Typography variant="h4" gutterBottom>
      Destacados
    </Typography>
    {/* Contenedor responsivo con flexbox */}
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center",
      }}
    >
      {currentProducts.map((p) => (
        <Card
          key={p.id}
          style={{
            flex: "1 1 calc(33.333% - 16px)", // hasta 3 por fila en desktop
            maxWidth: "300px",
            minWidth: "250px",
          }}
        >
          <CardContent>
            <Typography variant="h6">{p.title}</Typography>
            <Typography variant="body2">${p.price}</Typography>
          </CardContent>
          <CardActions>
                    <Button size="small" variant="outlined" component={Link} to={`/product/${p.id}`}>
                      Ver
                    </Button>
                    <Button onClick={() => dispatch(addToCart(p))} size="small" variant="contained">
                      Añadir al carrito 
                    </Button>
                    {cartItems.find(ci => ci.id === p.id) &&
                    <Button onClick={() => dispatch(removeFromCart(p.id))} size="small" variant="contained">
                    Quitar del carrito
                  </Button> 
                    }
                  </CardActions>
        </Card>
      ))}
    </div>
          <nav>
            {/* Paginación */}
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => setPage(value)}
        color="primary"
      />
    </div>
          </nav>
  </div>
        </>
      }
    </>
  );
}