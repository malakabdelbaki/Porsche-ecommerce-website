const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const authController = require("./controllers/authController");
const productController = require("./controllers/productController");
const customerController = require("./controllers/customerController");
const purchaseController = require("./controllers/purchaseController");

//JWT MIDDLEWARE (malak)
const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add user to request object
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

//AUTHENTICATION
app.get("/api/v1/login", authController.login); //login (malak)
app.get("/api/v1/register", authController.register); //reigster (toqa)

//purchase product
app.post(
  "/api/v1/purchase",
  authMiddleware,
  purchaseController.purchaseProduct
); //purchasing product (phebe)

//PRODUCT CONTROLLER
app.get("/api/v1/product", productController.getProducts); // browsing and searching all products (clara)
app.get("/api/v1/product/:id", productController.getProductById); //viewing product details (clara)

app.post("/api/v1/product", authMiddleware, productController.addProduct); // create/add product (roaa)
app.patch(
  "/api/v1/product/:id",
  authMiddleware,
  productController.updateProduct
); //update product (sandra)
app.delete(
  "/api/v1/product/:id",
  authMiddleware,
  productController.deleteProduct
);

//CUSTOMER CONTROLLER
app.post("/api/v1/customer", authMiddleware, customerController.addToCart); //add to cart (roaa)
app.delete(
  "/api/v1/customer",
  authMiddleware,
  customerController.removeFromCart
); //remove from cart (yousef)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });
