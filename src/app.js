const express = require('express');
const fs = require('fs');
const ProductManager = require('./ProductManager.js');

const app = express();

const productManager = new ProductManager('./products.json');

app.get('/products', (req, res) => {
    const products = productManager.getProducts();
    res.json(products);
  });

  app.listen(8080, () => {
    console.log('Servidor iniciado');
  });