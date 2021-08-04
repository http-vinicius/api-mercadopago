const express = require('express');
const MercadoPago = require('mercadopago');
const app = express();

app.listen(3000, (req, res) => {
  console.log('Server is running')
});