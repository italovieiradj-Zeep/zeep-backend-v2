import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Criar player
router.post('/create', async (req, res) => {
  try {
    const { name, device_id } = req.body;

    const { data, error } = await supabase
      .from('players')
      .insert([{ name, device_id }]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Player criado com sucesso!', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar players
router.get('/list', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('players')
      .select('*');

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
