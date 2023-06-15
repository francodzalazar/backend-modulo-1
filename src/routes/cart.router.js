import express from 'express';
import CartManager from '../CartManager';

const router = express.Router();
const cartManager = new CartManager();

router.post('/', (req, res) => {
    const products = req.body.products;
    const cart = cartManager.addCart(products);

    res.status(200).json(cart);
});

router.get('/:cid', (req, res) => {
    const cartId = req.params.cid;
    const cart = cartManager.getCartById(cartId);

    if (cart) {
        res.status(200).json(cart.products);
    } else {
        res.status(404).json({ message: 'Carrito no encontrado' });
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const cart = cartManager.getCartById(cartId);
    if (!cart) {
        res.status(404).json({ message: 'Carrito no encontrado' });
        return;
    }

    const existingProduct = cart.products.find((product) => product.product === productId);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        const newProduct = {
            product: productId,
            quantity: 1
        };
        cart.products.push(newProduct);
    }

    res.status(200).json(cart);
});


app.listen(8080, () => {
    console.log('Servidor iniciado en el puerto 8080');
});