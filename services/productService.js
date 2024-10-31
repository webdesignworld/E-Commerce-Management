const { client } = require("../db");
const db = client.db("ecommerce");

const createProduct = async (productData) => {
  try {
    const result = await db.collection("products").insertOne(productData);
    return result.insertedId;
  } catch (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
};

const getAllProducts = async () => {
  try {
    return await db.collection("products").find().toArray();
  } catch (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
};

const getProductById = async (id) => {
  try {
    return await db.collection("products").findOne({ _id: new ObjectId(id) });
  } catch (error) {
    throw new Error(`Error fetching product by ID: ${error.message}`);
  }
};

const updateProduct = async (id, updatedData) => {
  try {
    const result = await db
      .collection("products")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
    return result.modifiedCount > 0;
  } catch (error) {
    throw new Error(`Error updating product: ${error.message}`);
  }
};

const deleteProduct = async (id) => {
  try {
    const result = await db
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  } catch (error) {
    throw new Error(`Error deleting product: ${error.message}`);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
