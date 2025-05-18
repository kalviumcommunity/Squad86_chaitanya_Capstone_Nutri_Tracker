const express = require('express');
const Meal = require('../models/Meal');
const router = express.Router();

// GET all meals
router.get('/', async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST add a new meal
router.post('/', async (req, res) => {
  try {
    const { name, calories, protein, fat, fiber } = req.body;

    if (!name || !calories) {
      return res.status(400).json({ error: 'Name and calories are required.' });
    }

    const newMeal = new Meal({
      name,
      calories,
      protein: protein || 0,
      fat: fat || 0,
      fiber: fiber || 0,
    });

    const savedMeal = await newMeal.save();

    res.status(201).json({ message: 'Meal added successfully', meal: savedMeal });
  } catch (err) {
    console.error('Error saving meal:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
