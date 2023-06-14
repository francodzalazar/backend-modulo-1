import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const productManager = new ProductManager('./products.json');

app.get('/products', (req, res) => {
  const limit = req.query.limit; 
  let products = productManager.getProducts();

  if (limit) {
    products = products.slice(0, parseInt(limit)); 
  }

  res.json(products);
});


app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductsById(productId);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});



app.listen(8080, () => {
  console.log('Servidor iniciado');
});

