// controllers/songController.js

const { Song } = require('../models');

// Créer une chanson
const createSong = async (req, res) => {
  const { title, artist, url } = req.body;

  try {
    const newSong = await Song.create({
      title,
      artist,
      url,
    });

    res.status(201).json(newSong);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Obtenir toutes les chansons
const getSongs = async (req, res) => {
  try {
    const songs = await Song.findAll();

    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

module.exports = {
  createSong,
  getSongs,
};
