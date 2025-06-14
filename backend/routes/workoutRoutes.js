// routes/workoutRoutes.js
const express = require('express');
const Workout = require('../models/Workout');
const router = express.Router();

// GET all workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST add new workout
router.post('/', async (req, res) => {
  try {
    const { userId, workoutType, durationMinutes, caloriesBurned, date } = req.body;

    if (!workoutType || !durationMinutes) {
      return res.status(400).json({ error: 'Workout type and duration are required.' });
    }

    const newWorkout = new Workout({
      userId,
      workoutType,
      durationMinutes,
      caloriesBurned: caloriesBurned || 0,
      date: date || Date.now(),
    });

    const savedWorkout = await newWorkout.save();
    res.status(201).json({ message: 'Workout added successfully', workout: savedWorkout });
  } catch (err) {
    console.error('Error saving workout:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update workout by ID
router.put('/:id', async (req, res) => {
  try {
    const { workoutType, durationMinutes, caloriesBurned, date } = req.body;

    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      { workoutType, durationMinutes, caloriesBurned, date },
      { new: true }
    );

    if (!updatedWorkout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.json({ message: 'Workout updated', workout: updatedWorkout });
  } catch (err) {
    console.error('Error updating workout:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
