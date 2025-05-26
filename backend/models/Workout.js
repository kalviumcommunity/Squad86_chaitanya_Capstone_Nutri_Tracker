// models/Workout.js
const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  workoutType: { type: String, required: true }, // e.g., running, cycling
  durationMinutes: { type: Number, required: true },
  caloriesBurned: Number,
});

module.exports = mongoose.model('Workout', WorkoutSchema);
