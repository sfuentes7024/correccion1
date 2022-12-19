import express from 'express';
import routerProduct from '../routes/products.js';
import routerShoppingCart from '../routes/shoppingCart.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.use('/api/productos', routerProduct);
app.use('/api/carrito', routerShoppingCart);

app.use((req, res) => {
    const array = {
        'error': -2,
        'description': `Route: ${req.url} method: ${req.method} not implemented`
    }
    res.status(404).json(array);
})

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto 8081');
});


