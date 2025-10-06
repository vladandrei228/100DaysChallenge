# URL Shortener - Day 4 of 100-Day Coding Challenge

## Overview

This project is a full-stack **URL Shortener** application built as part of my 100-day coding challenge to enhance my software development skills while job hunting. The app allows authenticated users to shorten long URLs, view their shortened URLs with click counts, and redirect to original URLs via short codes. It demonstrates proficiency in secure backend data management, user authentication, and responsive frontend development using modern web technologies.

- **Day 1**: Task Tracker
- **Day 2-3**: Personal Finance Dashboard
- **Day 4**: URL Shortener (this project)

## Tech Stack

- **Frontend**: React.js (v18+), Vite (latest, for fast development), TypeScript (for type safety), Tailwind CSS (for responsive styling), React Router DOM (v6+, for client-side routing)
- **Backend**: Node.js (v18+), Express (v4+, for API server), TypeScript
- **Database & Auth**: Supabase (Postgres-based, for URL storage and email/password authentication)
- **Other Libraries**:
  - `@supabase/supabase-js` (for Supabase client)
  - `axios` (for HTTP requests)
  - `nanoid` (for generating unique short codes, optional)
- **Development Tools**:
  - `tailwindcss`(for Tailwind CSS setup -- the Guide from tailwindwebsite with VITE)
  - `typescript` (for type checking)
  - `vite` (build tool)
  - `eslint`, `prettier` (optional, for code linting/formatting)
- **Environment**: Git (for version control), npm (v8+ for package management)

## Project Structure

```bash
url-shortener/
├── url-shortener-backend/    # Node.js/Express API
│   ├── src/
│   │   └── index.ts         # Backend routes (/shorten, /:short_code, /my-urls)
│   ├── package.json
│   └── .env                 # SUPABASE_URL, SUPABASE_KEY, PORT
├── url-shortener-frontend/   # React Vite app
│   ├── src/
│   │   ├── components/      # Header.tsx, Home.tsx, Login.tsx, Dashboard.tsx
│   │   ├── utils/           # supabase.ts, types.ts
│   │   ├── App.tsx          # Main app with routing
│   │   ├── index.css        # Tailwind CSS
│   │   └── main.tsx         # Vite entry point
│   ├── package.json
│   └── .env                 # VITE_SUPABASE_URL, VITE_SUPABASE_KEY, VITE_BACKEND_URL
```

## Prerequisites

To run this project, ensure you have the following installed and configured:

- **Node.js**: Version 18 or higher (download from [nodejs.org](https://nodejs.org)).
- **npm**: Version 8 or higher (comes with Node.js).
- **Supabase Account**: Create a project at [app.supabase.com](https://app.supabase.com).
- **Git**: For cloning and version control (install from [git-scm.com](https://git-scm.com)).
- **Code Editor**: VS Code recommended (with TypeScript and ESLint extensions for better development experience).
- **Frontend Dependencies** (installed in `url-shortener-frontend`):
  - `react`, `react-dom` (v18+)
  - `react-router-dom` (v6+, for routing)
  - `@supabase/supabase-js` (for Supabase client)
  - `axios` (for API requests)
  - `tailwindcss`, `postcss`, `autoprefixer` (for Tailwind CSS)
  - `typescript` (for type checking)
- **Backend Dependencies** (installed in `url-shortener-backend`):
  - `express` (v4+, for API server)
  - `@supabase/supabase-js` (for database operations)
  - `typescript`, `ts-node`, `@types/node`, `@types/express` (for TypeScript support)
  - `nanoid` (optional, for short code generation)
- **Environment Variables**:
  - Backend `.env`:

    ```env
    SUPABASE_URL=your-supabase-project-url
    SUPABASE_KEY=your-supabase-anon-key
    PORT=3000
    ```

  - Frontend `.env`:

    ```env
    VITE_SUPABASE_URL=your-supabase-project-url
    VITE_SUPABASE_KEY=your-supabase-anon-key
    VITE_BACKEND_URL=http://localhost:3000
    ```

## Setup Instructions

### Backend Setup

1. Navigate to backend:

   ```bash
   cd url-shortener-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` with Supabase credentials and port (see above).

4. Build and run:

   ```bash
   npm run build
   npm start
   ```

   - API runs at `http://localhost:3000`.

### Frontend Setup

1. Navigate to frontend:

   ```bash
   cd url-shortener-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` with Supabase and backend URL (see above).

4. Run the app:

   ```bash
   npm run dev
   ```

   - App runs at `http://localhost:5173`.

### Supabase Setup

Follow these tasks to configure the Supabase database and authentication.

#### Task 1: Set up Supabase

- Create a new Supabase project at [app.supabase.com](https://app.supabase.com).
- Enable email/password authentication in **Authentication > Settings**.
- Create a database table named `urls` with columns:
  - `id`: Type `uuid`, check "Is Primary Key" and "Is Identity" (auto-generates UUID).
  - `user_id`: Type `uuid`, check "Is Foreign Key" → `auth.users(id)`.
  - `original_url`: Type `text`, uncheck "Is Nullable".
  - `short_code`: Type `text`, uncheck "Is Nullable", check "Is Unique".
  - `clicks`: Type `int4`, Default Value `0`.
  - `created_at`: Type `timestamptz`, Default Value `now()`, uncheck "Is Nullable".

**Example SQL** (reference, use Table Editor):

```sql
CREATE TABLE urls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  original_url TEXT NOT NULL,
  short_code TEXT NOT NULL UNIQUE,
  clicks INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

#### Task 2: Enable RLS and Create Policies

- In **Table Editor**, select `urls` > **Policies** tab, toggle **Enable RLS** to ON.
- Create policies:
  - **SELECT Policy**:
    - Name: `Users can view own URLs`
    - Target Roles: `authenticated`
    - Operation: `SELECT`
    - Using expression: `auth.uid() = user_id`
  - **INSERT Policy**:
    - Name: `Users can create own URLs`
    - Target Roles: `authenticated`
    - Operation: `INSERT`
    - With Check expression: `auth.uid() = user_id`
  - **UPDATE Policy**:
    - Name: `Users can update own URLs`
    - Target Roles: `authenticated`
    - Operation: `UPDATE`
    - Using expression: `auth.uid() = user_id`
    - With Check expression: `auth.uid() = user_id`
- **Test**: Create two test users. Insert one row per user in `urls`. In **SQL Editor**, sign in as each user, run `SELECT * FROM urls;`. See only their row? Try inserting/updating with wrong `user_id`—blocked?

**Example SQL** (reference, use dashboard):

```sql
CREATE POLICY "Users can view own URLs" ON urls
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own URLs" ON urls
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own URLs" ON urls
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

## Tasks

### Set up Supabase

- Create a new Supabase project.
- Set up authentication (email/password).
- Create a database table named `urls` with columns: `id` (uuid, primary key), `user_id` (uuid, foreign key to auth users), `original_url` (text), `short_code` (text, unique), `clicks` (int, default 0), `created_at` (timestamp).

### Backend Setup (Node.js)

- Create a Node.js server using Express.
- Implement endpoints:
  - **POST /shorten**: Authenticate user, take original URL, generate a unique short code (e.g., 6-8 characters), store in Supabase, return the shortened URL (e.g., `http://localhost:3000/{short_code}`).
  - **GET /:short_code**: Increment click count in DB, redirect to original URL.
  - **GET /my-urls**: Authenticate user, fetch and return list of user's shortened URLs with click counts.

### Short Code Generation

- Implement a function to generate unique short codes (use a library like `nanoid` or a custom random string generator).
- Check for uniqueness in the DB before saving.

### Frontend Setup (React)

- Create a React app with routes/pages for:
  - Login/Signup using Supabase auth.
  - Home page with a form to input URL and button to shorten.
  - Dashboard to list user's shortened URLs with click counts.
- Use Tailwind CSS for styling (e.g., responsive form, table for list).

### Integration

- Connect frontend to backend API.
- Handle authentication tokens.
- Use Supabase client in the backend for DB operations (or directly if needed, but route through Node.js for security).

### Error Handling and Polish

- Add validation (e.g., valid URL).
- Implement loading states and error messages.
- Make the UI clean and mobile-friendly with Tailwind.

### Testing

- Manually test shortening, redirection, click tracking, and user-specific views.
- Ensure no unauthorized access.

## Learning Goals

- **Database**: Master schema design and RLS for secure data access.
- **Backend**: Build and secure API endpoints with Express and Supabase.
- **Frontend**: Create a responsive, type-safe React app with Tailwind and React Router.
- **Full-Stack**: Integrate frontend, backend, and database with authentication.

## Future Enhancements

- Add URL expiration dates.
- Allow custom short codes.
- Build analytics charts for click data.

## Troubleshooting

- **RLS Issues**: Ensure RLS is enabled and policies use `auth.uid()`.
- **Foreign Key Errors**: Verify `user_id` matches `auth.users(id)`.
- **API Errors**: Check **Reports > API** in Supabase dashboard for query logs.
- **TypeScript**: Run `npm run build` to catch type errors.

---

Built by Vlad-Andrei Gruia as part of a 100-day coding challenge to showcase full-stack skills. Feedback welcome on GitHub!
