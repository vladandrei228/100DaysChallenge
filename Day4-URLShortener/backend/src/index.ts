import express, { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import { nanoid } from 'nanoid';

const app = express();
const port = 3001;

app.use(express.json());

// Supabase setup - replace with your project URL and anon key
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware for authentication (incomplete - implement token verification)
const authenticate = async (req: Request, res: Response, next: Function) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  // TODO: Verify token with supabase.auth.getUser(token)
  next();
};

// POST /shorten (incomplete - generate short code, check uniqueness, insert to DB)
app.post('/shorten', authenticate, async (req: Request, res: Response) => {
  const { original_url } = req.body;
  // TODO: Validate URL
  const short_code = nanoid(8); // Example, but check for uniqueness
  // TODO: Insert into supabase.from('urls').insert({...})
  res.json({ shortened_url: `http://localhost:${port}/${short_code}` });
});

// GET /:short_code (incomplete - fetch original, increment clicks, redirect)
app.get('/:short_code', async (req: Request, res: Response) => {
  const { short_code } = req.params;
  // TODO: Fetch from supabase.from('urls').select('*').eq('short_code', short_code)
  // TODO: Update clicks
  // res.redirect(original_url);
  res.send('Redirecting...');
});

// GET /my-urls (incomplete - fetch user's URLs)
app.get('/my-urls', authenticate, async (req: Request, res: Response) => {
  // TODO: Get user_id from auth, query supabase.from('urls').select('*').eq('user_id', user_id)
  res.json([]);
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});