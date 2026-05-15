const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const router = express.Router();

router.post('/create-ticket', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('sac')
      .insert([req.body])
      .select();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/list', async (req, res) => {
  try {
    const { data, error } = await supabase.from('sac').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
