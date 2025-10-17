import { FaSignInAlt, FaUserPlus, FaBook } from 'react-icons/fa';

interface AuthFormProps {
  onSignUp: (email: string, password: string) => Promise<void>;
  onLogin: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  onClearError: () => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  onSignUp, onLogin, loading, error, onClearError, email, setEmail, password, setPassword
}) => {
  const handleSignUp = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (!trimmedEmail || !trimmedPassword) {
      onClearError(); // Clear previous error
      return; // Prevent call
    }
    try {
      await onSignUp(trimmedEmail, trimmedPassword);
    } catch (err) {
      // Error handled in parent
      console.error(err);
    }
  };

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (!trimmedEmail || !trimmedPassword) {
      onClearError();
      return;
    }
    try {
      await onLogin(trimmedEmail, trimmedPassword);
    } catch (err) {
      // Error handled in parent
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h1 className="text-3xl font-bold text-center mb-6 text-purple-800">
            <FaBook className="inline mr-2" /> FlashLearn
          </h1>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error} <button onClick={onClearError} className="float-right text-red-500 hover:text-red-700">×</button>
            </div>
          )}
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // Ensure setter works
              className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  // Ensure setter works
              className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={handleLogin}
              disabled={loading || !email.trim() || !password.trim()}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              <FaSignInAlt className="inline mr-2" /> {loading ? 'Loading...' : 'Login'}
            </button>
            <button
              onClick={handleSignUp}
              disabled={loading || !email.trim() || !password.trim()}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              <FaUserPlus className="inline mr-2" /> {loading ? 'Loading...' : 'Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};