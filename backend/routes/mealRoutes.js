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

module.exports = router;
