import { useLocation } from "react-router-dom";
import { Container, Typography, Card, CardContent } from "@mui/material";

export function Success() {
const location = useLocation();
const query = new URLSearchParams(location.search);

const paymentId = query.get("payment_id");
const status = query.get("status");
const merchantOrderId = query.get("merchant_order_id"); 
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ textAlign: "center", p: 3, border: "2px solid #4caf50" }}>
        <CardContent>
          <Typography variant="h4" color="success.main" gutterBottom>
            ✅ Pago exitoso
          </Typography>
          <Typography variant="body1">¡Gracias por tu compra!</Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            <strong>ID de pago:</strong> {paymentId}
          </Typography>
          <Typography variant="body2">
            <strong>Estado:</strong> {status}
          </Typography>
          <Typography variant="body2">
            <strong>Orden:</strong> {merchantOrderId}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
