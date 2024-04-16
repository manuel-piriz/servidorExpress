const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
        this._loadFromFile();
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const productId = this.products.length + 1;

        const product = {
            id: productId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return 'Todos los campos son obligatorios';
        }

        if (this.products.some(product => product.code === code)) {
            return `Ya existe un producto con el código ${code}`;
        }

        this.products.push(product);
        this._writeToFile();
        return 'Producto agregado correctamente';
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error('Producto no encontrado.');
        }
        return product;
    }

    updateProduct(id, updatedFields) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error('Producto no encontrado.');
        }

        updatedFields.id = id;

        this.products[index] = { ...this.products[index], ...updatedFields };

        this._writeToFile();

        return 'Producto actualizado correctamente';
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error('Producto no encontrado.');
        }

        this.products.splice(index, 1);

        this._writeToFile();

        return 'Producto eliminado correctamente';
    }

    _loadFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            console.error('Error al cargar el archivo:', error.message);
        }
    }

    _writeToFile() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    }
}

const manager = new ProductManager('products.json'); 

console.log(manager.getProducts());

try {
    console.log(manager.getProductById(1));
} catch (error) {
    console.error(error.message);
}


try {
    console.log(manager.updateProduct(2, { price: 800, stock: 12 }));
} catch (error) {
    console.error(error.message);
}

try {
    console.log(manager.deleteProduct(8));
} catch (error) {
    console.error(error.message);
}

module.exports = ProductManager;