import express from 'express';
import ProductManager from '../ProductManager.js';

const router = express.Router();
const productManager = new ProductManager('./products.json');

// Rutas para /api/products
router.get('/', (req, res) => {
  const products = productManager.getProducts();
  res.json(products);
});

router.get('/:pid', (req, res) => {
  const productId = req.params.pid;
  const product = productManager.getProductsById(productId);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

router.post('/', (req, res) => {
  const { title, description, price, code, stock, thumbnails } = req.body;

  if (!title || !description || !price || !code || !stock) {
    return res.status(400).json({ message: 'Campos incompletos' });
  }

  const newProduct = new Product(title, description, price, thumbnails, code, stock);

  productManager.addProduct(newProduct);

  res.status(201).json({ message: 'Producto agregado', product: newProduct });
});

router.put('/:pid', (req, res) => {
  const productId = req.params.pid;
  const { title, description, price, code, stock, thumbnails } = req.body;

  const productToUpdate = productManager.getProductsById(productId);

  if (!productToUpdate) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  productToUpdate.title = title;
  productToUpdate.description = description;
  productToUpdate.price = price;
  productToUpdate.code = code;
  productToUpdate.stock = stock;
  productToUpdate.thumbnails = thumbnails;

  productManager.updateProduct(productId, productToUpdate);

  res.status(200).json({ message: 'Producto actualizado', product: productToUpdate });
});

router.delete('/:pid', (req, res) => {
  const productId = req.params.pid;

  productManager.deleteProduct(productId);

  res.status(200).json({ message: 'Producto eliminado' });
});



export default router;

