const Admin = require("../models/admin");
const Product = require("../models/product");

const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, production_year, quantity } = req.body;

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      production_year,
      quantity
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

const getProducts = async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await Product.find({});

    // If products are found, return them
    if (products && products.length > 0) {
      res.json(products);
    } else {
      // If no products are found, return a 404 status and message
      res.status(404).json({ message: "No products found" });
    }
  } catch (err) {
    // If an error occurs, return a 500 status and message
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    // Extract the product name from the request parameters
    const productID = req.params.id;

    // Search for the product in the database
    const product = await Product.findOne({ _id: productID });

    // If product is found, return it
    if (product) {
      res.status(200).json(product);
    } else {
      // If product is not found, return a 404 status and message
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    // If an error occurs, return a 500 status and message
    res.status(500).json({ message: err.message });
  }
};

const searchProductByName = async (req, res) => {
  try {
    const { name } = req.query;

    const products = await Product.find({
      name: { $regex: name, $options: "i" },
    });

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: "Products not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
      return res.status(404).json({ message: "Product not found" });
    }

    // Return the updated product as the response
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    console.log(req.params.id)
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
  searchProductByName,
  updateProduct,
  deleteProduct,
};
