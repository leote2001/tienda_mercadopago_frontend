import { useLocation } from "react-router-dom";
import { Container, Typography, Card, CardContent } from "@mui/material";

export function Pending() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const paymentId = query.get("payment_id");
    const status = query.get("status");
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ textAlign: "center", p: 3, border: "2px solid #ff9800" }}>
        <CardContent>
          <Typography variant="h4" color="warning.main" gutterBottom>
            ⏳ Pago pendiente
          </Typography>
          <Typography variant="body1">
            Tu pago está en revisión o pendiente de acreditación.
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
