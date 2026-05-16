import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Importar rotas
import authRoutes from './routes/auth.js'; // ← NOVA ROTA
import playersRoutes from './routes/players.js';
import playlistsRoutes from './routes/playlists.js';
import sacRoutes from './routes/sac.js';
import ttsRoutes from './routes/tts.js';
import billingRoutes from './routes/billing.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Healthcheck
app.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
  });
});

// ← ADICIONAR ROTA DE AUTH (sem proteção, é o login!)
app.use('/auth', authRoutes);

// Rotas protegidas
app.use('/players', playersRoutes);
app.use('/playlists', playlistsRoutes);
app.use('/sac', sacRoutes);
app.use('/tts', ttsRoutes);
app.use('/billing', billingRoutes);

app.use((err, req, res, next) => {
  console.error('Erro:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Erro interno',
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`🎵 Zeep Backend v2 rodando na porta ${PORT}`);
  console.log(`📍 GET http://localhost:${PORT}/status`);
});
