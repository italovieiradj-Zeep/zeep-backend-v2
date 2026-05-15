import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import playersRoutes from './routes/players.js';
import playlistsRoutes from './routes/playlists.js';
import sacRoutes from './routes/sac.js';
import ttsRoutes from './routes/tts.js';
import billingRoutes from './routes/billing.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/players', playersRoutes);
app.use('/playlists', playlistsRoutes);
app.use('/sac', sacRoutes);
app.use('/tts', ttsRoutes);
app.use('/billing', billingRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Zeep Backend v2 rodando na porta ${port}`);
});
