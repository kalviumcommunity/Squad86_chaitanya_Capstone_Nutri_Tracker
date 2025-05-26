const mongoose = require('mongoose');

const HydrationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  amountMl: { type: Number, required: true } // ml of water intake
});

module.exports = mongoose.model('Hydration', HydrationSchema);
