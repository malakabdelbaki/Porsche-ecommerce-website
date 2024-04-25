const express = require('express');
const app = express();
require('dotenv').config();
const authController = require('./controllers/authController');
const productController = require('./controllers/productController');
const customerController = require('./controllers/customerController');
const purchaseController = require('./controllers/purchaseController');


//JWT MIDDLEWARE (malak)
const authMiddleware = (req,res,next) => {

}

//AUTHENTICATION
app.get('/api/v1/login',authController.login)  //login (malak)
app.get('/api/v1/register',authController.register) //reigster (toqa)

//purchase product
app.post('/api/v1/purchase',authMiddleware, purchaseController.purchaseProduct) //purchasing product (phebe)

//PRODUCT CONTROLLER
app.get('/api/v1/product',productController.getProducts)// browsing and searching all products (clara)
app.get('/api/v1/product/:id',productController.getProductById) //viewing product details (clara)

app.post('/api/v1/product',authMiddleware,productController.createProduct) // create/add product (roaa)
app.patch('/api/v1/product/:id',authMiddleware,productController.updateProduct) //update product (sandra)
app.delete('/api/v1/product/:id',authMiddleware,productController.deleteProduct)


//CUSTOMER CONTROLLER
app.post('/api/v1/customer',authMiddleware,customerController.addToCart) //add to cart (roaa)
app.delete('/api/v1/customer',authMiddleware,customerController.removeFromCart) //remove from cart (yousef)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
 });