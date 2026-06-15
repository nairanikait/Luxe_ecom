const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  itemsText: [{ type: String }],
  meta: {
    items: { type: Number, required: true },
    method: { type: String, required: true },
    payment: { type: String, enum: ['Pending', 'Done'], default: 'Done' },
    date: { type: String, required: true }
  },
  paymentColor: { type: String, default: '#4b5563' },
  total: { type: String, required: true },
  status: { type: String, default: 'Order Placed' },
  statusSub: { type: String, default: 'Est. arrival in 3-5 business days' },
  img: { type: String, default: '' },
  statusColor: { type: String, default: '#4b5563' }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

module.exports = Order;
