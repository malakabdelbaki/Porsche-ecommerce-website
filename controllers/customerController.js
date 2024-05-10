const Customer = require("../models/customer");
const Product = require("../models/product");

const addToCart = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!req.body)
      return res.status(400).json({ message: "Product ID is required" });
    const customerId = req.user._id;
    const productId = req.body.productID;

    const customer = await Customer.findById(customerId);
    const product = await Product.findById(productId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found." });
    } else if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    if (product.stock <= 0)
      return res.status(404).json({ message: "Product out of stock." });

    customer.cart.push(product);
    await customer.save();

    res.status(200).json({
      message: `Product added to cart successfully. ${customer.cart}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding product to cart" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!req.body.productID)
      return res.status(400).json({ message: "Product ID is required" });
    const customerID = req.user._id;
    const productID = req.body.productID;

    const customer = await Customer.findById(customerID);
    const product = await Product.findById(productID);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found." });
    } else if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    if(customer.cart.includes(productID)){
      customer.cart = customer.cart.filter(
        (cartProductID) => cartProductID.toString() !== productID
      );
      
    await customer.save();
    res.status(200).json({ message: "Product deleted." });
  }
  else{
    return res.status(404).json({message:"product not found in cart"});
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting product from cart" });
  }
};

module.exports = { addToCart, removeFromCart };
