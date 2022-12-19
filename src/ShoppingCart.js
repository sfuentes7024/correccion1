import fs from 'fs';
import Product from './Product.js';

export default class ShoppingCart {

    constructor(fileName){
        this.fileName = fileName;
    }

    async save(){
        try {
            const shoppingCarts = await this.getAll();
            let nextId;

            if(!shoppingCarts.length){
                nextId = 1;
            } else {
                const lastItem = shoppingCarts.slice(-1)[0];
                let lastItemId = lastItem.id;
                nextId = lastItemId + 1;
            }

            const shoppingCart = {
                'id': nextId,
                'timestamp': Date.now(),
                'products': []
            };

            shoppingCarts.push(shoppingCart);
            const writeFile = await fs.promises.writeFile(this.archivo, JSON.stringify(shoppingCarts));
            return shoppingCart.id;

        } catch(e) {
            return false;
        }
    };

    async getAll(){
        try {
            const shoppingCarts = await fs.promises.readFile(this.archivo, 'utf-8');
            const shoppingCartsParse = JSON.parse(shoppingCarts);
            return shoppingCartsParse;
        } catch (e) {
            return false;
        }
    };

    async getById(id){
        try {
            const shoppingCarts = await fs.promises.readFile(this.archivo, 'utf-8');
            const shoppingCartsParse = JSON.parse(shoppingCarts);
            let cart = shoppingCartsParse.find(item => item.id == id );

            if(cart){
                return cart;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    };

    async deleteById(id){

        try {
            const cart = await this.getById(id);
            const shoppingCarts = await this.getAll();
            const cartDeleteIndex = shoppingCarts.filter(item => item.id != cart.id);
            const deleteById = await fs.promises.writeFile(this.archivo, JSON.stringify(cartDeleteIndex));

            if (cart){
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    };

    async getAllProductFromCart(id){

        try{
            const shoppingCart = await this.getById(id);
            const products = shoppingCart.products;
            
            if(products){
                return products;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    };

    async saveProduct(id, id_prod){

        try {
            const classProduct = new Product('./archives/productos.json');
            const product = await classProduct.getById(id_prod);

            if(product){
                const shoppingCarts = await this.getAll();
                const cartIndex = shoppingCarts.findIndex(item => item.id == id);
                if(cartIndex >= 0){
                    shoppingCarts[cartIndex].productos.push(product);
                    const writeFile = await fs.promises.writeFile(this.archivo, JSON.stringify(shoppingCarts));
                }
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    };

    async deleteProduct(id, id_prod){

        try{
            const shoppingCarts = await this.getAll();
            const cartIndex = shoppingCarts.findIndex(item => item.id == id);

            if(cartIndex >= 0){
                const productIndex = shoppingCarts[cartIndex].productos.splice(productIndex, 1);
                await fs.promises.writeFile(this.archivo, JSON.stringify(shoppingCarts));
            }
            return false;

        } catch (e) {
            return false;
        }
    };
    
}

