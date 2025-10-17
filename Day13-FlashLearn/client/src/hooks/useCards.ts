import { useState, useCallback, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';

export interface Card {
  id: string;
  question: string;
  answer: string;
}

export const useCards = (session: Session | null, deckId: string | null) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCards = useCallback(async () => {
    if (!session || !deckId) return;
    setLoading(true);
    try {
      const token = session.access_token;
      const res = await fetch(`http://localhost:3001/api/decks/${deckId}/cards`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setCards(await res.json());
      else throw new Error('Failed to load cards');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [session, deckId]);

  const createCard = useCallback(async (question: string, answer: string) => {
    if (!session || !deckId) return;
    try {
      const token = session.access_token;
      const res = await fetch(`http://localhost:3001/api/decks/${deckId}/cards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ question, answer }),
      });
      if (!res.ok) throw new Error('Create failed');
      await fetchCards();
    } catch (err) {
      console.error(err);
    }
  }, [session, deckId, fetchCards]);

  const deleteCard = useCallback(async (id: string) => {
    if (!session || !deckId) return;
    try {
      const token = session.access_token;
      const res = await fetch(`http://localhost:3001/api/decks/${deckId}/cards/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Delete failed');
      await fetchCards();
    } catch (err) {
      console.error(err);
    }
  }, [session, deckId, fetchCards]);

  const startQuiz = useCallback(async () => {
    if (!session || !deckId || cards.length === 0) return null;
    try {
      const token = session.access_token;
      const res = await fetch(`http://localhost:3001/api/decks/${deckId}/quiz`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) return await res.json();
      else throw new Error('Quiz failed');
    } catch (err) {
      console.error(err);
      return null;
    }
  }, [session, deckId, cards.length]);

  useEffect(() => {
    if (deckId) fetchCards();
  }, [deckId, fetchCards]);

  return { cards, loading, createCard, deleteCard, startQuiz };
};