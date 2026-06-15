const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true },
  variant: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  status: { type: String, enum: ['Active', 'Draft'], default: 'Active' },
  description: { type: String, default: '' },
  details: [{ type: String }],
  images: [{ type: String }],
  colors: [{
    label: { type: String },
    hex: { type: String }
  }],
  sizes: [{ type: String }],
  tag: { type: String },
  tagColor: { type: String }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;
