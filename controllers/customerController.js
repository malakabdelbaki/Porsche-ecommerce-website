const addToCart = async (req, res) => {};

const removeFromCart = async (req, res) => {
  try {
    const customerID = req.body.customerID;
    const productID = req.body.productID;

    const customer = await Customer.findById(customerID);
    const product = await Product.findById(productID);

    if (!customer || !product) {
      return res.status(404).json({ message: "Customer not found." });
    } else if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    customer.cart = customer.cart.filter(
      (product) => product._id !== productID
    );
    await customer.save();

    res.status(200).json({ message: "Product deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting product from cart" });
  }
};

module.exports = { addToCart, removeFromCart };
