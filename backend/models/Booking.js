// models/Booking.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  panditId: { type: Schema.Types.ObjectId, ref: 'Pandit', required: true },
  amount: { type: Number, required: true },
  adminSharePct: { type: Number, required: true }, // e.g., 20
  status: { type: String, enum: ['paid','completed','cancelled','refunded'], default: 'paid' },
  paidToAdmin: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  completedAt: Date,
  notes: String
});

module.exports = mongoose.model('Booking', bookingSchema);
