const express = require("express")
const ProductManager = require("./productManager");

const app = express()
const PORT = 8080

const productManager = new ProductManager('./products.json');

app.get('/products', (req, res) => {
    const products = productManager.getProducts();
    res.json(products);
});

app.get('/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    try {
        const product = productManager.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).json({ message: 'Producto no encontrado'});
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})