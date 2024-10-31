const { ObjectId } = require('mongodb');

class Order {
  constructor(db) {
    this.collection = db.collection('orders');
  }

  async create(orderData) {
    const order = {
      products: orderData.products.map((id) => new ObjectId(id)), 
      quantity: orderData.quantity, 
      total: orderData.total, 
      status: orderData.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await this.collection.insertOne(order);
    return result.ops[0];
  }

  async findAll() {
    return await this.collection.find({}).toArray();
  }

  async findById(id) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async updateById(id, updateData) {
    const updatedData = {
      ...updateData,
      updatedAt: new Date(),
    };

    if (updatedData.products) {
      updatedData.products = updatedData.products.map((id) => new ObjectId(id));
    }

    const result = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updatedData },
      { returnOriginal: false }
    );
    return result.value;
  }

  async deleteById(id) {
    return await this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = Order;

