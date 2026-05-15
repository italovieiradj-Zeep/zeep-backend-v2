import express from 'express';
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
import playersRoutes from './routes/players.js';
app.use('/players', playersRoutes);
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/players', require('./routes/players'));
app.use('/api/playlists', require('./routes/playlists'));
app.use('/api/sac', require('./routes/sac'));
app.use('/api/tts', require('./routes/tts'));
app.use('/api/billing', require('./routes/billing'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Zeep Backend v2 rodando na porta ${port}`);
});
