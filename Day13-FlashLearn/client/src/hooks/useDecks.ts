import { useState, useCallback } from 'react';
import type { Session } from '@supabase/supabase-js';

interface Deck {
  id: string;
  name: string;
}

export const useDecks = (session: Session | null) => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDecks = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    try {
      const token = session.access_token;
      const res = await fetch('http://localhost:3001/api/decks', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setDecks(await res.json());
      else throw new Error('Failed to load decks');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [session]);

  const createDeck = useCallback(async (name: string) => {
    if (!session) return;
    try {
      const token = session.access_token;
      const res = await fetch('http://localhost:3001/api/decks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error('Create failed');
      await fetchDecks();
    } catch (err) {
      console.error(err);
    }
  }, [session, fetchDecks]);

  const deleteDeck = useCallback(async (id: string) => {
    if (!session) return;
    try {
      const token = session.access_token;
      const res = await fetch(`http://localhost:3001/api/decks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Delete failed');
      await fetchDecks();
    } catch (err) {
      console.error(err);
    }
  }, [session, fetchDecks]);

  return { decks, loading, fetchDecks, createDeck, deleteDeck };
};