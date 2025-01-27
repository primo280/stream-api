const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const playlistRoutes = require('./routes/playlists');
const songRoutes = require('./routes/songs');
const db = require('./models'); 
require('dotenv').config();



const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/songs', songRoutes);
app.use('/auth', authRoutes);

app.use('/playlists', playlistRoutes);

app.get('/', (req, res) => res.send('API de streaming musical 🚀'));

app.listen(3000, () => console.log('Serveur démarré sur http://localhost:3000'));
