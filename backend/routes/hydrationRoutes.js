const express = require('express');
const Hydration = require('../models/Hydration');
const router = express.Router();

// GET all hydration logs
router.get('/', async (req, res) => {
  try {
    const logs = await Hydration.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST add new hydration log
router.post('/', async (req, res) => {
  try {
    const { userId, amount, date } = req.body;

    if (!amount) {
      return res.status(400).json({ error: 'Amount of water is required' });
    }

    const newLog = new Hydration({
      userId,
      amount,
      date: date || Date.now(),
    });

    const savedLog = await newLog.save();

    res.status(201).json({ message: 'Hydration log added', log: savedLog });
  } catch (err) {
    console.error('Error saving hydration log:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
