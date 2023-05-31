const fs = require("fs");

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
            console.log('Archivo guardado correctamente.');
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
            console.log(`Producto con ID ${id} actualizado correctamente.`);
        } else {
            console.log(`No se encontró ningún producto con ID ${id}.`);
        }
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex((prod) => prod.id === id);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            this.saveData();
            console.log(`Producto con ID ${id} eliminado correctamente.`);
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

let a = new ProductManager("datos.json");
a.addProduct({ title: "a", description: "a", price: "a", thumbnail: "a", code: "a", stock: "a" });
a.addProduct({ title: "b", description: "b", price: "b", thumbnail: "b", code: "a", stock: "b" });
a.addProduct({ title: "c", description: "c", price: "c", thumbnail: "c", code: "c", stock: "c" });
console.log(a);
console.log(a.getProductsById(2));
a.updateProduct(2, { title: "Producto", price: "Nuevo precio" });
console.log(a.getProducts());
a.deleteProduct(1);
console.log(a.getProducts());
