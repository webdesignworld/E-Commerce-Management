const { client } = require("../db");
const db = client.db("ecommerce");

const createOrder = async (orderData) => {
  try {
    const result = await db.collection("orders").insertOne(orderData);
    return result.insertedId;
  } catch (error) {
    throw new Error(`Error fetching orders: ${error.message}`);
  }
};

const getAllOrders = async () => {
  try {
    return await db.collection("orders").find().toArray();
  } catch (error) {
    throw new Error(`Error fetching orders: ${error.message}`);
  }
};

const getOrderById = async (id) => {
  try {
    return await db.collection("orders").findOne({ _id: new ObjectId(id) });
  } catch (error) {
    throw new Error(`Error fetching order by ID: ${error.message}`);
  }
};

const updateOrder = async (id, updatedData) => {
  try {
    const result = await db
      .collection("orders")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
    return result.modifiedCount > 0;
  } catch (error) {
    throw new Error(`Error updating order: ${error.message}`);
  }
};

const deleteOrder = async (id) => {
  try {
    const result = await db
      .collection("orders")
      .deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  } catch (error) {
    throw new Error(`Error deleting order: ${error.message}`);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
