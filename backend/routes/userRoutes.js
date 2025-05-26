// routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST add a new user
router.post('/', async (req, res) => {
  try {
    const { username, email, passwordHash, age, gender, height, weight, activityLevel } = req.body;

    if (!username || !email || !passwordHash) {
      return res.status(400).json({ error: 'Username, email, and passwordHash are required.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    const newUser = new User({
      username,
      email,
      passwordHash,
      age,
      gender,
      height,
      weight,
      activityLevel
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update user by ID
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });

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
