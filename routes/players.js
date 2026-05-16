import express from 'express';
import { createClient } from '@supabase/supabase-js';
import { authenticateToken } from '../middleware/auth.js'; // Importar

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// ✅ PROTEGIDA — Precisa de JWT válido
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const { name, device_id } = req.body;

    // req.user vem do middleware (contém dados do usuário autenticado)
    console.log(`Criando player para usuário: ${req.user.id}`);

    const { data, error } = await supabase
      .from('players')
      .insert([{ name, device_id, user_id: req.user.id }]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true, data });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ PROTEGIDA — Precisa de JWT válido
router.get('/list', authenticateToken, async (req, res) => {
  try {
    // Listar apenas players do usuário autenticado
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('user_id', req.user.id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
