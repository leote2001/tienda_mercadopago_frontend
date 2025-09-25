import { useLocation } from "react-router-dom";
import { Container, Typography, Card, CardContent } from "@mui/material";

export function Failure() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const paymentId = query.get("payment_id");
  const status = query.get("status");
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ textAlign: "center", p: 3, border: "2px solid #f44336" }}>
        <CardContent>
          <Typography variant="h4" color="error.main" gutterBottom>
            ❌ Pago fallido
          </Typography>
          <Typography variant="body1">
            Ocurrió un problema con tu pago. Por favor, intenta nuevamente.
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            <strong>ID de pago:</strong> {paymentId}
          </Typography>
          <Typography variant="body2">
            <strong>Estado:</strong> {status}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
