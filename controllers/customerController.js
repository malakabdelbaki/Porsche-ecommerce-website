const Customer = require('../models/customer');
const Product = require('../models/product');

const addToCart = async (req,res) => {
    try {
        const customerId = req.body.customerID; 
        const productId = req.body.productId; 
    
        
        const customer = await Customer.findById(customerId);
        const product = await Product.findById(productId);
    
        if (!customer || !product) {
            return res.status(404).json({ message: 'Customer not found.' });
          }
        else if(!product){
            return res.status(404).json({ message: 'Product not found.' });
        }
      
          customer.cart.push(product);
          await customer.save();
      
          res.status(200).json({ message: 'Product added to cart successfully.' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error adding product to cart' });
        }
      }




const removeFromCart = async (req,res) => {

}

module.exports = {addToCart,removeFromCart}