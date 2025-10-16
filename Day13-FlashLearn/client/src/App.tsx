import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { Session } from '@supabase/supabase-js';
import { FaSignInAlt, FaUserPlus, FaPlus, FaEye, FaTrash, FaQuestionCircle, FaBook, FaArrowLeft, FaSignOutAlt, FaPlayCircle, FaRedoAlt } from 'react-icons/fa';
import './App.css';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Deck {
  id: string;
  name: string;
}

interface Card {
  id: string;
  question: string;
  answer: string;
}

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [view, setView] = useState<'dashboard' | 'deck'>('dashboard');
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [deckName, setDeckName] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [decks, setDecks] = useState<Deck[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [quizCard, setQuizCard] = useState<Card | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    getSession();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session) fetchDecks();
  }, [session]);

  const clearError = useCallback(() => setError(null), []);

  const fetchDecks = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    setError(null);
    try {
      const token = session.access_token;
      const res = await fetch('http://localhost:3001/api/decks', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) {
        setDecks(await res.json());
      } else {
        throw new Error('Failed to load decks');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  }, [session]);

  const fetchCards = useCallback(async (deckId: string) => {
    if (!session) return;
    setLoading(true);
    setError(null);
    try {
      const token = session.access_token;
      const res = await fetch(`http://localhost:3001/api/decks/${deckId}/cards`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) {
        setCards(await res.json());
      } else {
        throw new Error('Failed to load cards');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  }, [session]);

  const handleSignUp = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [email, password]);

  const handleLogin = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setSession(data.session);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [email, password]);

  const handleLogout = useCallback(async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setSession(null);
      setView('dashboard');
      setDecks([]);
      setCards([]);
      setQuizCard(null);
      setSelectedDeckId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateDeck = useCallback(async () => {
    if (!deckName || !session) return;
    setLoading(true);
    setError(null);
    try {
      const token = session.access_token;
      const res = await fetch('http://localhost:3001/api/decks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: deckName }),
      });
      if (res.ok) {
        await fetchDecks();
        setDeckName('');
      } else {
        throw new Error('Create failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [deckName, session, fetchDecks]);

  const handleDeleteDeck = useCallback(async (id: string) => {
    if (!session) return;
    setLoading(true);
    setError(null);
    try {
      const token = session.access_token;
      const res = await fetch(`http://localhost:3001/api/decks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await fetchDecks();
        setSelectedDeckId(null);
      } else {
        throw new Error('Delete failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [session, fetchDecks]);

  const handleCreateCard = useCallback(async () => {
    if (!question || !answer || !selectedDeckId || !session) return;
    setLoading(true);
    setError(null);
    try {
      const token = session.access_token;
      const res = await fetch(`http://localhost:3001/api/decks/${selectedDeckId}/cards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ question, answer }),
      });
      if (res.ok) {
        await fetchCards(selectedDeckId);
        setQuestion('');
        setAnswer('');
      } else {
        throw new Error('Create failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [question, answer, selectedDeckId, session, fetchCards]);

  const handleDeleteCard = useCallback(async (id: string) => {
    if (!session || !selectedDeckId) return;
    setLoading(true);
    setError(null);
    try {
      const token = session.access_token;
      const res = await fetch(`http://localhost:3001/api/decks/${selectedDeckId}/cards/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await fetchCards(selectedDeckId);
      } else {
        throw new Error('Delete failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [session, selectedDeckId, fetchCards]);

  const startQuiz = useCallback(async () => {
    if (!selectedDeckId || !session) return;
    setLoading(true);
    setError(null);
    try {
      const token = session.access_token;
      const res = await fetch(`http://localhost:3001/api/decks/${selectedDeckId}/quiz`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) {
        const card = await res.json();
        setQuizCard(card);
        setFlipped(false);
      } else {
        throw new Error('No cards or failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [selectedDeckId, session]);

  const toggleFlip = useCallback(() => setFlipped((prev) => !prev), []);

  const selectDeck = useCallback((id: string) => {
    setSelectedDeckId(id);
    setView('deck');
    setError(null);
    fetchCards(id);
  }, [fetchCards]);

  // Enhanced Styles with lighter gradients and transitions
  const bgGradient = 'bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen p-4';
  const cardBg = 'bg-white shadow-md rounded-lg p-6 transition-shadow hover:shadow-lg';
  const buttonPrimary = 'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center disabled:opacity-50 transition-colors duration-200';
  const buttonSecondary = 'bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center justify-center disabled:opacity-50 transition-colors duration-200';
  const buttonDanger = 'bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center justify-center transition-colors duration-200';
  const inputStyle = 'w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 transition-all duration-200';
  const errorStyle = 'text-red-500 mb-2 text-sm';

  if (!session) {
    return (
      <div className={bgGradient + ' flex items-center justify-center'}>
        <div className={cardBg + ' w-96'}>
          <h1 className="text-2xl font-bold mb-4 flex items-center"><FaBook className="mr-2 text-blue-500" />FlashLearn</h1>
          {error && <p className={errorStyle}>{error} <button onClick={clearError} className="text-red-700">×</button></p>}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputStyle + ' mb-2'} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputStyle + ' mb-2'} />
          <button onClick={handleLogin} disabled={loading} className={buttonPrimary + ' w-full mb-2'}><FaSignInAlt className="mr-2" />{loading ? 'Loading...' : 'Login'}</button>
          <button onClick={handleSignUp} disabled={loading} className={buttonSecondary + ' w-full'}><FaUserPlus className="mr-2" />{loading ? 'Loading...' : 'Sign Up'}</button>
        </div>
      </div>
    );
  }

  if (view === 'dashboard') {
    return (
      <div className={bgGradient}>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold flex items-center"><FaBook className="mr-2 text-blue-500" />FlashLearn Dashboard</h1>
            <button onClick={handleLogout} className={buttonDanger}><FaSignOutAlt /></button>
          </div>
          {error && <p className={errorStyle}>{error} <button onClick={clearError} className="text-red-700">×</button></p>}
          <div className={cardBg + ' mb-4'}>
            <input placeholder="Deck Name" value={deckName} onChange={(e) => setDeckName(e.target.value)} className={inputStyle + ' mb-2'} />
            <button onClick={handleCreateDeck} disabled={loading || !deckName.trim()} className={buttonPrimary}><FaPlus className="mr-2" />{loading ? 'Adding...' : 'Add Deck'}</button>
          </div>
          {loading ? <p className="text-center">Loading decks...</p> : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {decks.map((deck) => (
                <li key={deck.id} className={cardBg}>
                  <h2 className="text-xl font-bold">{deck.name}</h2>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => selectDeck(deck.id)} className={buttonSecondary}><FaEye /></button>
                    <button onClick={() => handleDeleteDeck(deck.id)} className={buttonDanger}><FaTrash /></button>
                  </div>
                </li>
              ))}
              {decks.length === 0 && <p className="col-span-full text-center text-gray-500">No decks yet. Create one!</p>}
            </ul>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={bgGradient}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => setView('dashboard')} className={buttonPrimary}><FaArrowLeft className="mr-2" />Back to Decks</button>
          <button onClick={handleLogout} className={buttonDanger}><FaSignOutAlt /></button>
        </div>
        {error && <p className={errorStyle}>{error} <button onClick={clearError} className="text-red-700">×</button></p>}
        <h1 className="text-2xl font-bold mb-4">Deck: {decks.find(d => d.id === selectedDeckId)?.name || 'Loading...'}</h1>
        <div className={cardBg + ' mb-4'}>
          <input placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)} className={inputStyle + ' mb-2'} />
          <input placeholder="Answer" value={answer} onChange={(e) => setAnswer(e.target.value)} className={inputStyle + ' mb-2'} />
          <button onClick={handleCreateCard} disabled={loading || !question.trim() || !answer.trim()} className={buttonPrimary}><FaPlus className="mr-2" />{loading ? 'Adding...' : 'Add Card'}</button>
        </div>
        <div className="flex gap-4 mb-4">
          <h2 className="text-xl font-bold flex items-center"><FaQuestionCircle className="mr-2 text-blue-500" />Cards ({cards.length})</h2>
          <button onClick={startQuiz} className={buttonSecondary} disabled={loading || cards.length === 0}><FaPlayCircle className="mr-2" />Start Quiz</button>
        </div>
        {loading ? <p className="text-center">Loading cards...</p> : (
          <ul className="bg-white rounded shadow-md divide-y divide-gray-200">
            {cards.map((card) => (
              <li key={card.id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200">
                <div>
                  <p className="font-semibold">{card.question}</p>
                  <p className="text-gray-500 text-sm truncate">{card.answer}</p>
                </div>
                <button onClick={() => handleDeleteCard(card.id)} className={buttonDanger}><FaTrash /></button>
              </li>
            ))}
            {cards.length === 0 && <p className="text-center py-4 text-gray-500">No cards yet. Add one!</p>}
          </ul>
        )}
        {quizCard && (
          <div className={cardBg + ' mt-4'}>
            <h3 className="text-xl font-bold mb-2">Quiz Time!</h3>
            <div className="flip-card mx-auto max-w-md">
              <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
                <div className="flip-card-front bg-blue-100 rounded p-4 min-h-[150px] flex items-center justify-center">
                  <p className="text-center">{quizCard.question}</p>
                </div>
                <div className="flip-card-back bg-green-100 rounded p-4 min-h-[150px] flex items-center justify-center">
                  <p className="text-center">{quizCard.answer}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button onClick={toggleFlip} className={buttonPrimary}><FaRedoAlt className="mr-2" />Flip</button>
              <button onClick={() => setQuizCard(null)} className={buttonSecondary}><FaArrowLeft className="mr-2" />End Quiz</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;