// controllers/playlistController.js

const { Playlist, Song } = require('../models');

// Créer une playlist
const createPlaylist = async (req, res) => {
  const { name } = req.body;

  try {
    const newPlaylist = await Playlist.create({
      name,
      userId: req.user.id,
    });

    res.status(201).json(newPlaylist);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Obtenir toutes les playlists de l'utilisateur
const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.findAll({
      where: { userId: req.user.id },
      include: Song,
    });

    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Ajouter une chanson à une playlist
const addSongToPlaylist = async (req, res) => {
  const { playlistId, songId } = req.body;

  try {
    const playlist = await Playlist.findByPk(playlistId);
    const song = await Song.findByPk(songId);

    if (!playlist || !song) {
      return res.status(404).json({ message: 'Playlist ou chanson non trouvée' });
    }

    await playlist.addSong(song);
    res.status(200).json({ message: 'Chanson ajoutée à la playlist' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

module.exports = {
  createPlaylist,
  getPlaylists,
  addSongToPlaylist,
};
