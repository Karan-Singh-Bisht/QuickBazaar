const productService = require("../services/product.service");

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    return res.status(201).json(product);
  } catch (err) {
    return res.status(500).json({ message: "Error creating product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await productService.deleteProduct(req.params.productId);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: "Error deleting product" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const updateProduct = await productService.updateProduct(
      productId,
      req.body
    );
    return res
      .status(200)
      .json({ message: "Product updated successfully", data: updateProduct });
  } catch (err) {
    return res.status(500).json({ message: "Error updating product" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts(req.query);
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ message: "Error getting products" });
  }
};

const createMultipleProduct = async (req, res) => {
  try {
    const products = await productService.createMultipleProduct(req.body);
    return res
      .status(201)
      .json({ message: "Multiple Product created successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error creating multiple products" });
  }
};

const findProductById = async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await productService.findProductById(productId);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(404).json({ message: "Product not found" });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  createMultipleProduct,
  findProductById,
};
