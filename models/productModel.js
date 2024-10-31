const { ObjectId } = require('mongodb');

class Product {
  constructor(db) {
    this.collection = db.collection('products');
  }

  async create(productData) {
    const product = {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      stock: productData.stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await this.collection.insertOne(product);
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

module.exports = Product;
