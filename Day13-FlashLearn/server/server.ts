import express from 'express';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import dotenv from 'dotenv';
import { random } from 'lodash';

dotenv.config();

const app = express();
const PORT = 3001;

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

app.use(cors({ origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: false,
 }));

app.use(express.json());

//TODO: Implement Auth Middleware
const authMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  
  try{
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
    } 
    (req as any).user = user;
    (req as any).token = token;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

app.get('/test-supabase', async (req, res) => {
  const testSupabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await testSupabase.from('decks').select('count', { count: 'exact', head: true });
  if (error) {
    console.error('Test error:', error);
    return res.status(500).json({ error: error.message });
  }
  res.json({ success: true, rowCount: data });
});

// POST /api/decks - TODO: Create deck (protected)
app.post('/api/decks', authMiddleware, async (req: express.Request, res: express.Response) => {
  const { name } = req.body;
  const user = (req as any).user;
  

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Deck name is required and must be a non-empty string' });
  }
const token = (req as any).token;
  const userSupabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${token}`,
      },
    },
  });

  try {
    const {data, error }=await userSupabase.from('decks').insert({ name: name.trim(), user_id: user.id }).select().single();
    if (error) {
        console.error('Supabase insert error: ', error);
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data);
}catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/decks - TODO: Fetch user's decks (protected)
app.get('/api/decks', authMiddleware, async (req: express.Request, res: express.Response) => {
  const user = (req as any).user;
  const token = (req as any).token;
  const userSupabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${token}`,
      },
    },
  });

  try{
    const { data, error } = await userSupabase.from('decks').select('*').eq('user_id', user.id);
    if (error) {
      console.error('Supabase select error:', error);
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/decks/:id - TODO: Delete deck (protected, cascade to cards)
app.delete('/api/decks/:id', authMiddleware, async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const token = (req as any).token;
  const userSupabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${token}`,
      },
    },
  });

const { data: deck } = await userSupabase.from('decks').select('user_id').eq('id', id).single();
  if (!deck || deck.user_id !== user.id) return res.status(404).json({ error: 'Not found' });



  try{
    const { error } = await userSupabase.from('decks').delete().eq('id', id);
    if (error) {
      console.error('Supabase delete error:', error);
      return res.status(500).json({ error: error.message });
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/decks/:deckId/cards - TODO: Create card (protected)
app.post('/api/decks/:deckId/cards', authMiddleware, async (req: express.Request, res: express.Response) => {
  const { deckId } = req.params;
  const { question, answer } = req.body;
  const user = (req as any).user;
  const token = (req as any).token;
  const userSupabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${token}`,
      },
    },
  });

  if (!question || !answer) return res.status(400).json({ error: 'Question and answer required' });

  const { data: deck } = await userSupabase.from('decks').select('user_id').eq('id', deckId).single();
  if (!deck || deck.user_id !== user.id) return res.status(404).json({ error: 'Deck not found' });

  

  try{
    const {data, error} = await userSupabase.from('cards').insert({ deck_id: deckId, question, answer }).select();
    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: error.message });
    }
    res.json(data[0]);
    }catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
  });

// GET /api/decks/:deckId/cards - TODO: Fetch cards for deck (protected)
app.get('/api/decks/:deckId/cards', authMiddleware, async (req: express.Request, res: express.Response) => {
  const { deckId } = req.params;
  const user = (req as any).user;
  
  const token = (req as any).token;
  const userSupabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const {data: deck} = await userSupabase.from('decks').select('user_id').eq('id', deckId).single();
  if (!deck || deck.user_id !== user.id) return res.status(404).json({ error: 'Deck not found' });


  try{
    const { data, error } = await userSupabase.from('cards').select('*').eq('deck_id', deckId);
    if (error) {
      console.error('Supabase select error:', error);
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/decks/:deckId/cards/:cardId -TODO: Delete card (protected)
app.delete('/api/decks/:deckId/cards/:cardId', authMiddleware, async (req: express.Request, res: express.Response) => {
  const { deckId, cardId } = req.params;
  const user = (req as any).user;
  const token = (req as any).token;
  const userSupabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const { data: card } = await userSupabase.from('cards').select('deck_id').eq('id', cardId).single();
  if (!card) return res.status(404).json({ error: 'Card not found' });

  const { data: deck } = await userSupabase.from('decks').select('user_id').eq('id', card.deck_id).single();
  if (!deck || deck.user_id !== user.id) return res.status(404).json({ error: 'Not authorized' });

  try{
    const { error } = await userSupabase.from('cards').delete().eq('id', cardId);
    if (error) {
      console.error('Supabase delete error:', error);
      return res.status(500).json({ error: error.message });
    }
    res.json({ success: true });
  }catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});


// GET /api/decks/:deckId/quiz - Get random card (use user client with global headers including apikey)
app.get('/api/decks/:deckId/quiz', authMiddleware, async (req: express.Request, res: express.Response) => {
  const { deckId } = req.params;
  const user = (req as any).user;
  const token = (req as any).token;

  console.log(`Quiz request for deckId: ${deckId}, userId: ${user.id}`);  // Debug log

  // Create client with ANON key and attach BOTH apikey and Bearer token to all requests
  const userSupabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${token}`,
      },
    },
  });

  // Check deck ownership
  const { data: deck } = await userSupabase.from('decks').select('user_id').eq('id', deckId).single();
  console.log(`Deck check:`, deck);  // Debug: Log deck data
  if (!deck || deck.user_id !== user.id) {
    console.log('Deck not found or not owned by user');  // Debug
    return res.status(404).json({ error: 'Deck not found' });
  }

  try {
    // Fixed: .order('random()') without { ascending: true }
    const { data, error } = await userSupabase
  .rpc('get_random_card', { deck_id_param: deckId });
    console.log(`Card query data:`, data, `Error:`, error);  // Debug: Log card resultit(1);
    if (error || !data.length) {
      console.log('No cards found or query error');  // Debug
      return res.status(404).json({ error: 'No cards or not found' });
    }
    res.json(data[0]);
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});