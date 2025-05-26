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

// POST new hydration log
router.post('/', async (req, res) => {
  try {
    const { userId, amountMl, date } = req.body;

    if (!userId || !amountMl) {
      return res.status(400).json({ error: 'userId and amountMl are required' });
    }

    const newLog = new Hydration({
      userId,
      amountMl,
      date: date || new Date()
    });

    const savedLog = await newLog.save();
    res.status(201).json({ message: 'Hydration log added', log: savedLog });
  } catch (err) {
    console.error('Error saving hydration log:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update hydration log by ID
router.put('/:id', async (req, res) => {
  try {
    const { amountMl, date } = req.body;

    const updatedLog = await Hydration.findByIdAndUpdate(
      req.params.id,
      { amountMl, date },
      { new: true }
    );

    if (!updatedLog) {
      return res.status(404).json({ error: 'Hydration log not found' });
    }

    res.json({ message: 'Hydration log updated', log: updatedLog });
  } catch (err) {
    console.error('Error updating hydration log:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
