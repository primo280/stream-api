const express = require('express');
const { Playlist, Song, PlaylistSong } = require('../models');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const playlist = await Playlist.create(req.body);
    res.json(playlist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/:playlistId/songs', async (req, res) => {
  try {
    await PlaylistSong.create({ playlistId: req.params.playlistId, songId: req.body.songId });
    res.json({ message: 'Chanson ajoutée à la playlist' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
