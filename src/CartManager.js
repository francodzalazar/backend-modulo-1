const fs = require('fs');

class CartManager {
    constructor(path) {
        this.carts = [];
        this.path = path;
        this.loadData();
    }

    loadData() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            const carts = JSON.parse(data);
            this.carts = carts;
        } catch (error) {
            console.error('Error al leer el archivo:', error);
        }
    }

    saveData() {
        try {
            const data = JSON.stringify(this.carts, null, '\t');
            fs.writeFileSync(this.path, data, { flag: 'w' });
            console.log('Archivo guardado correctamente.');
        } catch (error) {
            console.error('Error al guardar el archivo:', error);
        }
    }

    addCart(products) {
        const cartId = this.carts.length === 0 ? 1 : this.carts[this.carts.length - 1].id + 1;

        const cart = {
            id: cartId,
            products: products || []
        };

        this.carts.push(cart);
        this.saveData();

        return cart;
    }

    getCartById(cartId) {
        return this.carts.find((cart) => cart.id === cartId);
    }
}

const cartManager = new CartManager('./cart.json');
