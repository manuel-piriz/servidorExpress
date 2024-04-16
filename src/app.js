const express = require("express")
const ProductManager = require("./productManager");

const app = express()
const PORT = 8080

const productManager = new ProductManager('products.json');

app.get('/products', (req, res) => {
    const products = productManager.getProducts();
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})