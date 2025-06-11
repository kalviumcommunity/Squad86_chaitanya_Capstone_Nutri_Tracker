const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  mealType: { type: String, required: true },
  foods: [
    {
      name: String,
      calories: Number,
      fats: Number,
      proteins: Number,
      fiber: Number
    }
  ],
  totalCalories: Number,
  totalFats: Number,
  totalProteins: Number,
  totalFiber: Number
});

module.exports = mongoose.model('Meal', mealSchema);
