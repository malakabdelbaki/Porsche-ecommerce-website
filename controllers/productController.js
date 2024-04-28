const getProducts = async (req,res) => {

}

const getProductById = async (req,res) => {


}

const createProduct = async (req,res) => {

}

const updateProduct = async (req,res) => {

}

const deleteProduct = async (req,res) => {
    try {
        const result = await Product.findByIdAndDelete(req.params.id);
        if (!result) {
          return res.status(404).json({ message: 'No product found with that ID' });
        }
        res.status(200).json({ message: 'Product deleted successfully', productId: result._id });
      } catch (error) {
        res.status(500).json({ message: 'Failed to delete product' });
      }

}

module.exports = {getProducts,getProductById,createProduct,updateProduct,deleteProduct}