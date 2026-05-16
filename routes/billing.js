import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Criar invoice
router.post('/create-invoice', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('billing')
      .insert([req.body])
      .select();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar invoices
router.get('/list', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('billing')
      .select('*');

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
