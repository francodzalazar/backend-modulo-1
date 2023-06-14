import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        const product = new Product(title, description, price, thumbnail, code, stock);

        product.id = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1;

        if (this.products.some((prod) => prod.code === code)) {
            console.log(`Código existente en ${product.title}`);
        } else {
            this.products.push(product);
            this.saveData();
        }
    }

    getProductsById(id) {
        return this.products.find((prod) => prod.id === id);
    }

    saveData() {
        const data = JSON.stringify(this.products, null, '\t');
        try {
            fs.writeFileSync(this.path, data, { flag: 'w' });
        } catch (error) {
            console.error('Error al guardar el archivo:', error);
        }
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            const products = JSON.parse(data);
            this.products = products;
            return this.products;
        } catch (error) {
            console.error('Error al leer el archivo:', error);
            return [];
        }
    }
    updateProduct(id, updatedId) {
        const productToUpdate = this.products.find((prod) => prod.id === id);
        if (productToUpdate) {
            const updatedProduct = { ...productToUpdate, ...updatedId };
            const index = this.products.indexOf(productToUpdate);
            this.products[index] = updatedProduct;
            this.saveData();
            console.log(`Producto con ID ${id} actualizado.`);
        } else {
            console.log(`No se encontró ningún producto con ID ${id}.`);
        }
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex((prod) => prod.id === id);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            this.saveData();
            console.log(`Producto con ID ${id} eliminado.`);
        } else {
            console.log(`No se encontró ningún producto con ID ${id}.`);
        }
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = null;
    }
}

let a = new ProductManager("products.json");
a.addProduct({ title: "Teclado", description: "mecanico", price: "4000", thumbnail: "a", code: "a", stock: "5" });
a.addProduct({ title: "Mouse", description: "mouse color", price: "6500", thumbnail: "b", code: "b", stock: "8" });
a.addProduct({ title: "Auricular", description: "gamer", price: "8000", thumbnail: "c", code: "c", stock: "4" });



export default ProductManager;