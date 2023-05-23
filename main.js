class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct = ({ title, description, price, thumbnail, code, stock }) => {
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.length === 0 ? product.id = 1 : product.id = this.products[this.products.length - 1].id + 1;

        this.products.some((product) => product.code === code) ? console.log(`codigo existente en ${product.title}`) : this.products.push(product);
    }

    getProductsById = (id) => {
        const product = this.products.find((prod) => prod.id === id)
        return product
    }

}
/*
let a = new ProductManager ();
a.addProduct({title:"a", description:"a", price:"a", thumbnail:"a", code:"a", stock:"a"})
a.addProduct({title:"b", description:"a", price:"a", thumbnail:"a", code:"a", stock:"a"})
a.addProduct({title:"c", description:"a", price:"a", thumbnail:"a", code:"c", stock:"a"})
console.log(a);
console.log(a.getProductsById(2));
*/