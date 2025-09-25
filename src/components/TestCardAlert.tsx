import { Alert, AlertTitle } from "@mui/material";

export function TestCardAlert() {
  return (
    <Alert severity="info" variant="outlined">
      <AlertTitle>Importante!</AlertTitle>
      Para simular un pago abre el enlace del checkout en una ventana de incógnito. Utiliza los siguientes datos de una tarjeta de crédito de prueba. No se realizará un pago real:<br />
      Número de la tarjeta: <strong>5031 7557 3453 0604</strong><br />
      Nombre del titular: <strong>APRO</strong><br />
      DNI: <strong>12345678</strong><br />
      Vencimiento: <strong>11/30</strong><br />
      CVV: <strong>123</strong><br />
      Email: <strong>test_user_8920816458992548756@testuser.com</strong>
    </Alert>
  );
}
