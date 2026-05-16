import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

router.post('/create', async (req, res) => {
  try {
    const { name, description, tags } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Campo "name" é obrigatório' });
    }

    const { data, error } = await supabase
      .from('playlists')
      .insert([{ name, description, tags }])
      .select();

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/list', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('playlists')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
