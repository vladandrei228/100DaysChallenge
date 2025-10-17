import { useState, useCallback } from 'react';
import type { Card } from './useCards';

export const useQuiz = (startQuiz: () => Promise<Card | null>) => {
  const [quizCard, setQuizCard] = useState<Card | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openQuiz = useCallback(async () => {
    const card = await startQuiz();
    if (card) {
      setQuizCard(card);
      setFlipped(false);
      setShowModal(true);
    }
  }, [startQuiz]);

  const closeQuiz = useCallback(() => {
    setShowModal(false);
    setQuizCard(null);
    setFlipped(false);
  }, []);

  const toggleFlip = useCallback(() => setFlipped((prev) => !prev), []);

  const nextQuestion = useCallback(async () => {
    const card = await startQuiz();
    if (card) {
      setQuizCard(card);
      setFlipped(false);
    }
  }, [startQuiz]);

  return { quizCard, flipped, showModal, openQuiz, closeQuiz, toggleFlip, nextQuestion };
};