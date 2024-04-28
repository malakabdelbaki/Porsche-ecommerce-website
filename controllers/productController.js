const Admin = require('../models/admin');
const Product = require('../models/product');


const addProduct = async (req,res) => {
    try {
        
        const { name, price, description, category, production_year } = req.body;

        const newProduct = new Product({
          name,
          price,
          description,
          category,
          production_year
        });
    
        await newProduct.save();
    
        res.status(201).json({ message: 'Product added successfully.', product: newProduct });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error' });
      }
    }
    
    module.exports = addProduct;




const getProducts = async (req,res) => {

}

const getProductById = async (req,res) => {


}

const updateProduct = async (req,res) => {

}

const deleteProduct = async (req,res) => {

}

module.exports = {getProducts,getProductById,createProduct,updateProduct,deleteProduct}