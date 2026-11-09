const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  composition: { type: String, required: true },
  packaging: { type: String, required: true },
  category: { type: String, required: true },
  indications: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
