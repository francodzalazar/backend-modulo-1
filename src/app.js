import express from 'express';
import productRouter from './routes/product.router';
import cartRouter from './routes/cart.router';

const app = express();

app.use(express.json());
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.listen(8080, () => {
  console.log('Servidor iniciado');
});
