import { FaPlus } from 'react-icons/fa';

interface CardFormProps {
  onCreate: () => Promise<void>;
  loading: boolean;
  question: string;
  setQuestion: (q: string) => void;
  answer: string;
  setAnswer: (a: string) => void;
}

export const CardForm: React.FC<CardFormProps> = ({ onCreate, loading, question, setQuestion, answer, setAnswer }) => (
  <div className="p-6 bg-white rounded-lg shadow-sm mb-6">
    <h2 className="text-xl font-bold text-purple-800 mb-4">Add New Card</h2>
    <div className="space-y-4">
      <input
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
      <input
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
      <button
        onClick={onCreate}
        disabled={loading || !question.trim() || !answer.trim()}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-medium transition-colors disabled:opacity-50"
      >
        <FaPlus className="inline mr-2" /> {loading ? 'Adding...' : 'Add Card'}
      </button>
    </div>
  </div>
);