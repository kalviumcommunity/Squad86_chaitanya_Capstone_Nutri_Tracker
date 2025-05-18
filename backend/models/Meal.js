const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  fats: { type: Number, required: true },
  proteins: { type: Number, required: true },
  fiber: { type: Number, required: true },
  quantity: { type: Number, required: true }, // grams or serving size
});

const MealSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  mealType: { 
    type: String, 
    enum: ['breakfast', 'lunch', 'dinner', 'snack'], 
    required: true 
  },
  foods: [FoodItemSchema],
  totalCalories: Number,
  totalFats: Number,
  totalProteins: Number,
  totalFiber: Number,
});

module.exports = mongoose.model('Meal', MealSchema);
