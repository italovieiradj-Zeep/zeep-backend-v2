import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

router.post('/create-ticket', async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Título e descrição são obrigatórios' });
    }

    const { data, error } = await supabase
      .from('sac')
      .insert([{ title, description, priority: priority || 'normal' }])
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
      .from('sac')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
