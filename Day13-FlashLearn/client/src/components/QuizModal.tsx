import { FaRedoAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import type { Card } from '../hooks/useCards';

interface QuizModalProps {
  card: Card | null;
  flipped: boolean;
  onFlip: () => void;
  onNext: () => Promise<void>;
  onClose: () => void;
  loading: boolean;
}

export const QuizModal: React.FC<QuizModalProps> = ({ card, flipped, onFlip, onNext, onClose, loading }) => {
  if (!card) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl">
        <div className="p-6">
          <h3 className="text-xl font-bold text-center mb-4 text-purple-800">Quiz Time!</h3>
          <div className="flip-card mx-auto max-w-md mb-6">
            <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
              <div className="flip-card-front bg-purple-100 rounded-lg p-6 min-h-[200px] flex items-center justify-center">  {/* Fixed min-h */}
                <p className="text-center text-purple-800 font-medium">{card.question}</p>
              </div>
              <div className="flip-card-back bg-purple-200 rounded-lg p-6 min-h-[200px] flex items-center justify-center">  {/* Fixed min-h */}
                <p className="text-center text-purple-800 font-medium">{card.answer}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={onFlip}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <FaRedoAlt className="inline mr-2" /> {flipped ? 'Reset' : 'Flip'}
            </button>
            <button
              onClick={onNext}
              disabled={loading}
              className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <FaArrowRight className="inline mr-2" /> Next
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <FaArrowLeft className="inline mr-2" /> Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};