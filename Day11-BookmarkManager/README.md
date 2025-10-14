# Day 11 — Bookmark Manager (React + TypeScript + Tailwind + Supabase + Node)

---

## Problem statement

Build a **Bookmark Manager** single-page app. Users can add URLs with title and tags, search and filter bookmarks by tag or title, and delete. The front-end is React + TypeScript + Tailwind. Data persistence is via Supabase. A minimal Node.js TypeScript server provides a single API route to proxy create/delete actions.

Keep the UX minimal and accessible. Focus on correct TypeScript types, optimistic UI updates for create/delete, and good component structure.

---

## Acceptance criteria

1. App loads bookmarks from Supabase (or mock) and displays them.
2. User can add a bookmark (title, url, tags comma-separated). New bookmark shows immediately (optimistic) and is saved to server.
3. User can delete a bookmark with confirmation; deletion is optimistic and rollbacks on error.
4. User can filter bookmarks by a tag (single tag) and search by title or URL (case-insensitive).
5. Types (Bookmark, API payloads) are defined and used throughout.

---

## Tasks (implement these TODOs)

1. **Supabase client:** Implement `src/lib/supabase.ts` with `fetchBookmarks()`, `createBookmark(payload)`, `updateBookmark(id, payload)`, `deleteBookmark(id)` functions.

2. **BookmarkList component:** Implement filtering (tag + search) and optimistic delete with rollback on error.

3. **AddBookmark form:** Implement the form and client-side validation (URL must be a valid http(s) url). Use optimistic UI for creation.

4. **Node server route:** Implement POST `/api/bookmarks` (create), PUT `/api/bookmarks/:id` (update), DELETE `/api/bookmarks/:id` (delete) to call the shared supabase wrapper.

5. **Types:** Ensure `src/types.ts` defines `Bookmark`, `CreateBookmarkPayload`, and `ApiResponse<T>`.

6. **Accessibility & styling:** Use Tailwind classes for clean layout and ensure buttons/inputs have labels and accessible attributes.

---

## Overview

This project is a **Bookmark Manager** built with:

- **Frontend:** React.js + TypeScript + Tailwind.css
- **Backend:** Node.js + Express + TypeScript
- **Database:** Supabase (bookmarks stored with a text[] for tags)

It allows users to create, update, delete, and search bookmarks with multiple tags.

## Folder Structure

### Server

```bash
server/
 ├─ src/
 │   ├─ db/supabaseClient.ts
 │   ├─ routes/bookmarks.ts
 │   ├─ types.ts
 │   └─ index.ts
 ├─ package.json
 ├─ tsconfig.json
 └─ .env
```

### Client

```bash
client/
 ├─ src/
 │   ├─ components/
 │   │   ├─ AddBookmarkForm.tsx
 │   │   ├─ BookmarkList.tsx
 │   │   └─ SearchBar.tsx
 │   ├─ lib/api.ts
 │   ├─ types.ts
 │   ├─ App.tsx
 │   └─ main.tsx
 ├─ index.html
 ├─ package.json
 ├─ tsconfig.json
 ├─ tailwind.config.js
 └─ postcss.config.js
```

## Running the Project

### Server-side

1: Install dependencies:

```bash
cd server
npm install
```

2: Create `.env`:

```code
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
PORT=5000
```

3: Run the server:

```bash
npm run dev
```

Server will run on `http://localhost:3000`.

### Client-Side

1: Install dependencies:

```bash
cd client
npm install
```

2: Create `.env`:

```code
VITE_API_URL=http://localhost:3000/api/bookmarks
```

3: Run the client:

```bash
npm run dev
```

Open the local URL displayed by Vite (usually `http://localhost:5173`).

## Notes

- **CRUD functions** are in `server/src/db/supabaseClient.ts`:
  - `getBookmarks()`
  - `createBookmark(payload)`
  - `updateBookmark(id, payload)`
  - `deleteBookmark(id)`

- **Client API** functions are in `client/src/lib/api.ts`:
  - `fetchBookmarks()`
  - `addBookmark(payload)`
  - `deleteBookmark(id)`

- **Search filtering** supports multiple terms:

```ts
const searchTerms = searchTerm.toLowerCase().split(' ').filter(t => t.trim() !== '');
const filtered = bookmarks.filter(b =>
  searchTerms.every(term =>
    b.title.toLowerCase().includes(term) ||
    b.tags.some(tag => tag.toLowerCase().includes(term))
  )
);
```

- This is a **quick setup project** without authentication.

## License

MIT
