import { FaPlus } from 'react-icons/fa';

interface DeckFormProps {
  onCreate: (name: string) => Promise<void>;
  loading: boolean;
  deckName: string;
  setDeckName: (name: string) => void;
}

export const DeckForm: React.FC<DeckFormProps> = ({ onCreate, loading, deckName, setDeckName }) => (
  <div className="p-6 bg-white rounded-lg shadow-sm mb-6 max-w-md mx-auto">  {/* Fixed max-w for form */}
    <h2 className="text-xl font-bold text-purple-800 mb-4">Create New Deck</h2>
    <div className="flex gap-4">  {/* Fixed flex for consistent layout */}
      <input
        placeholder="Deck Name"
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
        className="flex-1 p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
      <button
        onClick={() => onCreate(deckName)}
        disabled={loading || !deckName.trim()}
        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50" 
      >
        <FaPlus className="inline mr-2" /> {loading ? 'Adding...' : 'Create'}
      </button>
    </div>
  </div>
);