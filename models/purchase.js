//include express for creating the route
const express = require('express');
const router = express.Router();
//verifying JSON Web Tokens (JWT)
const jwt = require('jsonwebtoken');
const Customer = require('../models/customer');
const Product = require('../models/product');
//to be modified after middleware created change path
const authMiddleware = require('../middleware/auth');

// POST request to purchase a product (private API)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const customerId = req.user.id; // Get the authenticated user's ID from the request
    const productId = req.body.productId; // Get the product ID from the request body

    // Retrieve customer and product from the database
    const customer = await Customer.findById(customerId);
    const product = await Product.findById(productId);

    if (!customer || !product) {
      return res.status(404).json({ message: 'Customer or product not found.' });
    }

    // Add the purchased product to the customer's cart
    customer.cart.push(product);

    // Save the updated customer document
    await customer.save();

    res.status(200).json({ message: 'Product purchased successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
