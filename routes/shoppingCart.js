import express from 'express';
import { Router } from 'express';
import Cart from '../src/ShoppingCart.js';

const router = Router();
const cart = new Cart('./archives/shoppingCart.json');

router.post('/', async (req, res) => {
    const cartPost = req.body;
    const saveCart = await cart.save();
    
    if(saveCart){
        res.json({
            'status': 'ok',
            'message': 'Carrito creado correctamente',
            'code': '200',
            'id': saveCart
        });
    } else {
        res.json({
            'status': 'nok',
            'message': 'Cart could not be created',
            'code': '400',
            'id': null
        });
    }
});

router.delete('/:id', async (req, res) => {
    let cart_id = parseInt(req.params.id);
    const deleteCart = await cart.deleteById(cart_id);
    if(deleteCart){
        res.json({
            'status': 'ok',
            'message': 'Cart has been deleted successfully',
            'code': '400'
        });
    } else {
        res.json({
            'status': 'nok',
            'message': 'Cart could not be deleted',
            'code': '400'
        });
    }
});

router.get('/:id/productos', async (req, res) => {
    let cart_id = parseInt(req.params.id);
    const products = await cart.getAllProductFromCart(cart_id);
    if(products){
        res.json({
            'status':'ok',
            'message': 'Products in cart sended successfully',
            'code': '200',
            'products': products
        });
    } else {
        res.json({
            'status': 'nok',
            'message': 'Products could not be sended',
            'code': '400',
            'products': null
        });
    }
});

router.post('/:id/productos', async (req, res) => {
    let cart_id = parseInt(req.params.id);
    let prod_id = parseInt(req.body.prod_id);
    const addProducts = await cart.saveProduct(cart_id, prod_id);

    if(addProducts){
        res.json({
            'status': 'ok',
            'message': 'Product added successfully',
            'code': '200'
        });
    } else {
        res.json({
            'status': 'nok',
            'message': 'Product could not be added at cart',
            'code': '400'
        });
    }
});

router.delete('/:id/productos/:id_prod', async (req, res) => {
    let cart_id = parseInt(req.params.id);
    let prod_id = parseInt(req.params.id_prod);
    const deleteProducts = await cart.deleteProduct(cart_id, prod_id);
    
    if(deleteProducts){
        res.json({
            'status': 'ok',
            'message': 'Product deleted successfully',
            'code': '200'
        });
    } else {
        res.json({
            'status':'nok',
            'message': 'Product could not be eliminated from Cart',
            'code': '400'
        });
    }
});

export default router;