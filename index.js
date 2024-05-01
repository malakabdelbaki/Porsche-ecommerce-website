const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authController = require("./controllers/authController");
const productController = require("./controllers/productController");
const customerController = require("./controllers/customerController");
const purchaseController = require("./controllers/purchaseController");
app.use(express.json());

//JWT MIDDLEWARE (malak)
const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  // Extract the token from the Authorization header
  const token = authHeader.split(" ")[1];
  // if (!token) {
  //   return res.status(401).json({ msg: "No token, authorization denied" });
  // }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add user to request object
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

const authorizeType = (req, res, next) => {
  // if (!req.user) {
  //   return res
  //     .status(401)
  //     .json({ message: "You need to be logged in to access this route" });
  // }

  const { type } = req.user;
  if (type != "admin") {
    return res
      .status(403)
      .json({ message: "You do not have permission to perform this action" });
  }
  next();
};


//AUTHENTICATION
app.post("/api/v1/login", authController.login); //login (malak) works 
app.post("/api/v1/register", authController.register); //reigster (toqa) works

//purchase product
app.post(
  "/api/v1/purchase",
  authMiddleware,
  purchaseController.purchaseProduct
); //purchasing product (phebe) works

//PRODUCT CONTROLLER
app.get("/api/v1/product", productController.getProducts); // browsing and searching all products (clara)
app.get("/api/v1/product/:id", productController.getProductById); //viewing product details (clara)

app.post(
  "/api/v1/product",
  authMiddleware,
  authorizeType,
  productController.addProduct
); // create/add product (roaa) works but has to check for admin or customer
app.patch(
  "/api/v1/product/:id",
  authMiddleware,
  authorizeType,
  productController.updateProduct
); //update product (sandra)
app.delete(
  "/api/v1/product/:id",
  authMiddleware,
  authorizeType,
  productController.deleteProduct
); //(marina) works

//CUSTOMER CONTROLLER
app.post("/api/v1/customer", authMiddleware, customerController.addToCart); //add to cart (roaa)  works
app.delete(
  "/api/v1/customer",
  authMiddleware,
  authorizeType,
  customerController.removeFromCart
); //remove from cart (yousef) works


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
