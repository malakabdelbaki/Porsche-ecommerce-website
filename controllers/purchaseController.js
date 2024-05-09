const Customer = require('../models/customer');
const Product = require('../models/product');

const purchaseProduct = async (req, res) => {
  try {
      const customerId = req.user._id; // Get the authenticated user's ID from the request
      // Retrieve the customer from the database
      const customer = await Customer.findById(customerId);
      if (!customer) {
          return res.status(404).json({ message: 'Customer not found.' });
      }

      // Verify that the cart is not empty
      if (customer.cart.length === 0) {
          return res.status(400).json({ message: 'Your cart is empty.' });
      }

      // Calculate total price and check stock availability
      let totalPrice = 0;
      for (const item of customer.cart) {
          const product = await Product.findById(item._id);
          if (!product || product.stock < 1) {
              return res.status(400).json({ message: Product ${product ? product.name : 'with ID ' + item.productId} is out of stock or does not have sufficient quantity. });
          }
          totalPrice += product.price;
      }
      //????????????????
      // // Check if the customer can afford the total cart price
      // if (customer.balance < totalPrice) {
      //     return res.status(400).json({ message: 'Insufficient funds to complete the purchase.' });
      // }

      // Process the purchase for each item in the cart
      for (const item of customer.cart) {
          const product = await Product.findById(item._id);
          // Deduct the quantity from product stock
          product.quantity--;
          await product.save();
      }

      
      customer.cart = []; // Clearing the cart after purchase
      await customer.save();
  
      console.log("All items purchased successfully");

      res.status(200).json({ message: 'All items in cart purchased successfully. Total paid =',  totalPrice});
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
  }
}

module.exports = {
    purchaseProduct
}