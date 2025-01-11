const Category = require("../models/category.model");
const Product = require("../models/product.model");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

async function createProduct(reqData) {
  let topLevel = await Category.findOne({ name: reqData.topLavelCategory });
  if (!topLevel) {
    topLevel = new Category({
      name: reqData.topLavelCategory,
      level: 1,
    });
    await topLevel.save();
  }

  let secondLevel = await Category.findOne({
    name: reqData.secondLavelCategory,
    parentCategory: topLevel._id,
  });

  if (!secondLevel) {
    secondLevel = new Category({
      name: reqData.secondLavelCategory,
      parentCategory: topLevel._id,
      level: 2,
    });

    await secondLevel.save();
  }

  let thirdLevel = await Category.findOne({
    name: reqData.thirdLavelCategory,
    parentCategory: secondLevel._id,
  });

  if (!thirdLevel) {
    thirdLevel = new Category({
      name: reqData.thirdLavelCategory,
      parentCategory: secondLevel._id,
      level: 3,
    });
    await thirdLevel.save();
  }

  const product = new Product({
    title: reqData.title,
    color: reqData.color,
    description: reqData.description,
    discountedPrice: reqData.discountedPrice,
    discountPersent: reqData.discountPersent,
    imageUrl: reqData.imageUrl,
    brand: reqData.brand,
    price: reqData.price,
    sizes: reqData.size,
    quantity: reqData.quantity,
    category: thirdLevel._id,
  });

  return await product.save();
}

async function deleteProduct(productId) {
  const product = await Product.findProductById(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  await Product.findByIdAndDelete(productId);
  return "Product Deleted Successfully";
}

async function updateProduct(productId, reqData) {
  return await Product.findByIdAndUpdate(productId, reqData);
}

async function findProductById(productId) {
  const product = await Product.findById(productId).populate("category").exec();
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
}

async function getAllProducts(reqQuery) {
  try {
    let {
      category,
      color,
      sizes,
      minPrice,
      maxPrice,
      minDiscount,
      sort,
      stock,
      pageNumber = 1,
      pageSize = 10,
    } = reqQuery;

    pageNumber = Math.max(1, Number(pageNumber)); // Ensure page >= 1
    pageSize = Math.max(1, Number(pageSize)); // Ensure pageSize >= 1

    let query = Product.find().populate("category");

    // Category filter
    if (category) {
      const existCategory = await Category.findOne({ name: category });

      if (existCategory) {
        query = query.where("category").equals(existCategory._id);
      } else {
        return { content: [], currentPage: 1, totalPages: 0 };
      }
    }

    // Color filter
    if (color) {
      const colorSet = new Set(
        color.split(",").map((color) => color.trim().toLowerCase())
      );
      const colorRegex =
        colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
      query = query.where("color").regex(colorRegex);
    }

    // Size filter
    if (sizes) {
      const sizeSet = new Set(sizes);
      query = query.where("sizes.name").in([...sizeSet]);
    }

    // Price range filter
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      query = query
        .where("discountedPrice")
        .gte(Number(minPrice))
        .lte(Number(maxPrice));
    }

    // Discount filter
    if (minDiscount) {
      query = query.where("discountPersent").gt(Number(minDiscount));
    }

    // Stock filter
    if (stock) {
      if (stock == "in_stock") {
        query = query.where("quantity").gt(0);
      } else if (stock == "out_of_stock") {
        query = query.where("quantity").lt(1);
      }
    }

    // Sorting
    if (sort) {
      const sortDirection = sort === "price_high" ? -1 : 1;
      query = query.sort({ discountedPrice: sortDirection });
    }

    // Pagination
    const totalProduct = await Product.countDocuments(query);
    const skip = (pageNumber - 1) * pageSize;

    query = query.skip(skip).limit(pageSize);

    const products = await query.exec();

    const totalPages = Math.ceil(totalProduct / pageSize);

    return {
      content: products,
      currentPage: pageNumber,
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Internal Server Error");
  }
}

async function createMultipleProduct(products) {
  for (let product of products) {
    await createProduct(product);
  }
}

module.exports = {
  createMultipleProduct,
  getAllProducts,
  createProduct,
  findProductById,
  updateProduct,
  deleteProduct,
};
