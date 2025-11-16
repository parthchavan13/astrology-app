// models/Transaction.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  type: { type: String, enum: ['userPayment','payout','refund','adminTransfer'], required: true },
  bookingId: { type: Schema.Types.ObjectId, ref: 'Booking' },
  panditId: { type: Schema.Types.ObjectId, ref: 'Pandit' },
  amount: { type: Number, required: true },
  adminShare: Number,
  panditShare: Number,
  status: { type: String, enum: ['pending','done','failed'], default: 'done' },
  meta: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
