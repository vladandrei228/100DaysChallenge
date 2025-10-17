import { FaEye, FaTrash, FaPlayCircle } from 'react-icons/fa';

interface DeckCardProps {
  deck: { id: string; name: string };
  onView: (id: string) => void;
  onDelete: (id: string) => void;
  onStartQuiz: (id: string) => void;
}

export const DeckCard: React.FC<DeckCardProps> = ({ deck, onView, onDelete, onStartQuiz }) => (
  <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <h2 className="text-xl font-bold text-purple-800 mb-4">{deck.name}</h2>
    <div className="flex gap-2">
      <button
        onClick={() => onView(deck.id)}
        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition-colors"
      >
        <FaEye className="inline mr-1" /> View
      </button>
      <button
      title='trash'
        onClick={() => onDelete(deck.id)}
        className="px-3 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors"
      >
        <FaTrash />
      </button>
      <button
      title='play'
        onClick={() => onStartQuiz(deck.id)}
        className="px-3 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition-colors"
      >
        <FaPlayCircle />
      </button>
    </div>
  </div>
);