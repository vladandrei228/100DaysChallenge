import { useState, useCallback } from 'react';
import { useAuth } from './hooks/useAuth';
import { useDecks } from './hooks/useDecks';
import { useCards } from './hooks/useCards';
import { useQuiz } from './hooks/useQuiz';
import { AuthForm } from './components/AuthForm';
import { DeckForm } from './components/DeckForm';
import { DeckCard } from './components/DeckCard';
import { CardForm } from './components/CardForm';
import { CardList } from './components/CardList';
import { QuizModal } from './components/QuizModal';
import './App.css';

function App() {
  const [view, setView] = useState<'dashboard' | 'deck'>('dashboard');
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [deckName, setDeckName] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { session, loading: authLoading, signUp, signIn, signOut } = useAuth();
  const { decks, loading: decksLoading, createDeck, deleteDeck } = useDecks(session);
  const { cards, loading: cardsLoading, createCard, deleteCard, startQuiz } = useCards(session, selectedDeckId);
  const { quizCard, flipped, showModal, openQuiz, closeQuiz, toggleFlip, nextQuestion } = useQuiz(() => startQuiz());

  const clearError = useCallback(() => setError(null), []);

  const handleCreateDeck = useCallback(async () => {
    if (!deckName.trim()) return;
    await createDeck(deckName.trim());
    setDeckName('');
  }, [deckName, createDeck]);

  const handleSelectDeck = useCallback((id: string) => {
    setSelectedDeckId(id);
    setView('deck');
    setError(null);
  }, []);

  const handleStartQuiz = useCallback(async (id: string) => {
    setSelectedDeckId(id);
    await openQuiz();
  }, [openQuiz]);

  const handleCreateCard = useCallback(async () => {
    if (!question.trim() || !answer.trim()) return;
    await createCard(question.trim(), answer.trim());
    setQuestion('');
    setAnswer('');
  }, [question, answer, createCard]);

  const handleDeleteCard = useCallback(async (id: string) => {
    await deleteCard(id);
  }, [deleteCard]);

  const handleLogin = useCallback(async (email: string, password: string) => {
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      return;
    }
    setError(null);
    await signIn(email.trim(), password.trim());
  }, [signIn]);

  const handleSignUp = useCallback(async (email: string, password: string) => {
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      return;
    }
    setError(null);
    await signUp(email.trim(), password.trim());
  }, [signUp]);

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center text-purple-600">Loading...</div>;
  }

  if (!session) {
    return (
      <AuthForm
        onSignUp={handleSignUp}
        onLogin={handleLogin}
        loading={false}
        error={error}
        onClearError={clearError}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    );
  }

  if (view === 'dashboard') {
    return (
      <div className="min-h-screen p-4 bg-purple-50">
        <div className="max-w-4xl mx-auto">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-purple-800">FlashLearn</h1>
            <button onClick={signOut} className="text-purple-600 hover:text-purple-800 font-medium">
              Logout
            </button>
          </header>
          <DeckForm onCreate={handleCreateDeck} loading={false} deckName={deckName} setDeckName={setDeckName} />
          <div className="max-h-96 overflow-y-auto">  {/* Scrollable deck list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {decks.map((deck) => (
                <DeckCard
                  key={deck.id}
                  deck={deck}
                  onView={handleSelectDeck}
                  onDelete={deleteDeck}
                  onStartQuiz={handleStartQuiz}
                />
              ))}
            </div>
          </div>
        </div>
        <QuizModal
          card={quizCard}
          flipped={flipped}
          onFlip={toggleFlip}
          onNext={nextQuestion}
          onClose={closeQuiz}
          loading={false}
        />
      </div>
    );
  }

  // Deck View
  return (
    <div className="min-h-screen p-4 bg-purple-50">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <button onClick={() => setView('dashboard')} className="text-purple-600 hover:text-purple-800 font-medium">
            ← Back to Dashboard
          </button>
          <button onClick={signOut} className="text-purple-600 hover:text-purple-800">
            Logout
          </button>
        </header>
        <h1 className="text-2xl font-bold text-purple-800 mb-6 text-center">
          {decks.find(d => d.id === selectedDeckId)?.name || 'Deck'}
        </h1>
        <CardForm
          onCreate={handleCreateCard}
          loading={false}
          question={question}
          setQuestion={setQuestion}
          answer={answer}
          setAnswer={setAnswer}
        />
        <CardList cards={cards} onDelete={handleDeleteCard} loading={cardsLoading} />
      </div>
      <QuizModal
        card={quizCard}
        flipped={flipped}
        onFlip={toggleFlip}
        onNext={nextQuestion}
        onClose={closeQuiz}
        loading={false}
      />
    </div>
  );
}

export default App;