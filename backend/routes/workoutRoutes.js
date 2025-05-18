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
    const { userId, type, duration, caloriesBurned, date } = req.body;

    if (!type || !duration) {
      return res.status(400).json({ error: 'Type and duration are required.' });
    }

    const newWorkout = new Workout({
      userId,
      type,
      duration,
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

// PUT update user by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated', user: updatedUser });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
