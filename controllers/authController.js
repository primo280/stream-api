// controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Inscription d'un utilisateur
const register = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Utilisateur déjà existant' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, username, password: hashedPassword });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Connexion d'un utilisateur
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ message: 'Identifiants incorrects' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

module.exports = {
  register,
  login,
};
