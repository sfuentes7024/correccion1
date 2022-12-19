import express from 'express';
import { Router } from 'express';
import Product from '../src/Product.js';
import { permissions } from '../middlewares/superadmin.js';



const routerProducts = new Router();
const product = new Product('./archives/productos.json');

routerProducts.get("/", async (req, res) => {
    const products = await product.getAll();

    if(products){
        res.json({
            'status': 'ok',
            'message': 'Product list delivered successfully',
            'code': '200',
            'products': products
        });
    } else {
        res.json({
            'status':'nok',
            'message': 'Product list could not be delivered',
            'code': '400',
            'products': null
        });
    }
});

routerProducts.get("/:id", async (req, res) => {
    let product_id = parseInt(req.params.id);
    const producto = await product.getById(product_id);

    if (producto){

        res.json({
            'status': 'ok',
            'message': 'Product delivered succesfully',
            'code':'200',
            'product': producto
        });
    } else {
        res.json({
            'status': 'nok',
            'message': 'Product could not be found',
            'code': '400',
            'product': null
        });
    }
});

routerProducts.post("/", permissions, async(req, res) => {
    const productPost = req.body;
    const saveProduct = await product.save(productPost);
    console.log(product);
    if(saveProduct){
        res.json({
            'status': 'ok',
            'message': 'Product saved',
            'code': '200',
            'product': saveProduct
        });
    } else {
        res.json({
            'status':'nok',
            'message': 'Error, product could not be saved',
            'code': '400',
            'product': null
        });
    }
});

routerProducts.put("/:id", permissions, async(req, res) => {
    const productReq = req.body;
    let product_id = parseInt(req.params.id);
    const updateProduct = await product.updateById(product_id, productReq);

    if(updateProduct){
        res.json({
            'status':'ok',
            'message': 'Product edited successfully',
            'code':'200',
            'product': updateProduct
        });
    } else {
        res.json({
            'status':'nok',
            'message': 'Product could not be edited',
            'code': '400',
            'product': null
        });
    }
});

routerProducts.delete("/:id", permissions, async(req, res) => {
    let product_id = parseInt(req.params.id);
    const deleteProduct = await product.deleteById(product_id);

    if(deleteProduct){
        res.json({
            'status': 'ok',
            'message': 'Product deleted successfully',
            'code': '200'
        });
    } else {
        res.json({
            'status': 'nok',
            'message': 'Product could not be deleted',
            'code': '400'
        });
    }
});

export default routerProducts;