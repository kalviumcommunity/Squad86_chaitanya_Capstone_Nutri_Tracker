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

module.exports = router;
