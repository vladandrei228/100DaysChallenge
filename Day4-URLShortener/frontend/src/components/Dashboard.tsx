import React, { useState } from 'react';
import type { Url } from '../utils/types';

const Dashboard: React.FC = () => {
  const [urls, setUrls] = useState<Url[]>([]);

  // TODO: On component mount, get auth token from supabase.auth.getSession
  // TODO: Fetch user's URLs from VITE_BACKEND_URL/my-urls with auth token
  // TODO: Update urls state with fetched data
  // TODO: Handle errors (e.g., network issues) and display them

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Your Shortened URLs</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Original</th>
            <th className="border p-2">Short</th>
            <th className="border p-2">Clicks</th>
          </tr>
        </thead>
        <tbody>
          {/* TODO: Map urls to table rows, displaying original_url, short_code, and clicks */}
          {/* TODO: Make short_code a clickable link to VITE_BACKEND_URL/short_code */}
        </tbody>
      </table>
      {/* TODO: Add error message display if fetch fails */}
      {/* TODO: Add loading state (e.g., show placeholder or spinner) */}
    </div>
  );
};

export default Dashboard;