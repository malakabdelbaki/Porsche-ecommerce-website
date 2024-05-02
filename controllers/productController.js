const Admin = require("../models/admin");
const Product = require("../models/product");

const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, production_year } = req.body;

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      production_year,
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product added successfully.", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error" });
  }
};

module.exports = addProduct;

const getProducts = async (req, res) => {};

const getProductById = async (req, res) => {};

const updateProduct = async (req, res) => {
  const { id } = req.params;
    const productData = req.body;

    try {
        // Find the product by ID and update it with the new data
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            productData,
            { new: true } // Return the updated product
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Return the updated product as the response
        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "No product found with that ID" });
    }
    res
      .status(200)
      .json({ message: "Product deleted successfully", productId: result._id });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
