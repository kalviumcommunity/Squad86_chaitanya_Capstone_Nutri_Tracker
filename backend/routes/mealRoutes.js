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
    const { userId, date, mealType, foods } = req.body;

    if (!userId || !date || !mealType || !foods || !Array.isArray(foods)) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Calculate totals
    const totalCalories = foods.reduce((sum, item) => sum + item.calories, 0);
    const totalFats = foods.reduce((sum, item) => sum + item.fats, 0);
    const totalProteins = foods.reduce((sum, item) => sum + item.proteins, 0);
    const totalFiber = foods.reduce((sum, item) => sum + item.fiber, 0);

    const newMeal = new Meal({
      userId,
      date,
      mealType,
      foods,
      totalCalories,
      totalFats,
      totalProteins,
      totalFiber
    });

    const savedMeal = await newMeal.save();
    res.status(201).json({ message: 'Meal added successfully', meal: savedMeal });

  } catch (err) {
    console.error('Error saving meal:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update a meal
router.put('/:id', async (req, res) => {
  try {
    const { userId, date, mealType, foods } = req.body;

    if (!userId || !date || !mealType || !foods || !Array.isArray(foods)) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Recalculate totals
    const totalCalories = foods.reduce((sum, item) => sum + item.calories, 0);
    const totalFats = foods.reduce((sum, item) => sum + item.fats, 0);
    const totalProteins = foods.reduce((sum, item) => sum + item.proteins, 0);
    const totalFiber = foods.reduce((sum, item) => sum + item.fiber, 0);

    const updatedMeal = await Meal.findByIdAndUpdate(
      req.params.id,
      {
        userId,
        date,
        mealType,
        foods,
        totalCalories,
        totalFats,
        totalProteins,
        totalFiber
      },
      { new: true }
    );

    if (!updatedMeal) {
      return res.status(404).json({ error: 'Meal not found' });
    }

    res.json({ message: 'Meal updated', meal: updatedMeal });

  } catch (err) {
    console.error('Error updating meal:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
