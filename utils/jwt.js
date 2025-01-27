// utils/jwt.js

const jwt = require('jsonwebtoken');

// Générer un JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Vérifier un JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Token invalide ou expiré');
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
