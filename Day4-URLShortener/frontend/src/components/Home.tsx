import React, { useState } from 'react';

const Home: React.FC = () => {
  const [url, setUrl] = useState('');
  const [shortened, setShortened] = useState('');

  const handleShorten = async () => {
    // TODO: Validate the input URL (e.g., check if it's a valid URL format)
    // TODO: Get auth token from supabase.auth.getSession
    // TODO: Make a POST request to VITE_BACKEND_URL/shorten with the URL and token
    // TODO: Handle API response to set shortened URL or display error
    setShortened('Shortened URL here'); // Placeholder
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 w-full mb-2"
        placeholder="Enter long URL"
      />
      <button
        onClick={handleShorten}
        className="bg-blue-500 text-white p-2 w-full"
      >
        Shorten
      </button>
      {shortened && <p>Shortened: {shortened}</p>}
      {/* TODO: Add error message display if API call fails */}
      {/* TODO: Add loading state (e.g., disable button, show spinner) */}
    </div>
  );
};

export default Home;