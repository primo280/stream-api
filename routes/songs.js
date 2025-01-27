const express = require('express');
const { Song } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
  const songs = await Song.findAll();
  res.json(songs);
});

router.post('/', async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.json(song);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
