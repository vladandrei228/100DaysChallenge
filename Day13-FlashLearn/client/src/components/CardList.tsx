import { FaTrash } from 'react-icons/fa';
import type { Card } from '../hooks/useCards';

interface CardListProps {
  cards: Card[];
  onDelete: (id: string) => Promise<void>;
  loading: boolean;
}

export const CardList: React.FC<CardListProps> = ({ cards, onDelete, loading }) => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <h2 className="text-xl font-bold text-purple-800 mb-4">Cards</h2>
    <div className="max-h-96 overflow-y-auto space-y-3">  {/* Scrollable: max-h + overflow-y-auto */}
      {loading ? (
        <p className="text-center text-purple-600">Loading cards...</p>
      ) : cards.map((card) => (
        <div key={card.id} className="p-4 bg-purple-50 rounded-lg flex justify-between items-start">
          <div className="flex-1">
            <p className="font-semibold text-purple-800">{card.question}</p>
            <p className="text-gray-600 text-sm truncate">{card.answer}</p>
          </div>
          <button
          title='trash'
            onClick={() => onDelete(card.id)}
            className="ml-4 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
    {cards.length === 0 && !loading && (
      <p className="text-center text-gray-500 py-8">No cards yet. Add one to get started!</p>
    )}
  </div>
);