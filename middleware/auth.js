import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Middleware que verifica se o JWT é válido
export const authenticateToken = async (req, res, next) => {
  try {
    // Pega o JWT da header "Authorization"
    // Formato esperado: "Bearer SEU_JWT_AQUI"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    // Supabase valida o token para você
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ error: 'Token inválido ou expirado' });
    }

    // Se chegou aqui, token é válido!
    // Passa o usuário para a próxima função
    req.user = data.user;
    next();

  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
