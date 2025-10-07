# 🔠 Anagram Finder - Full Project

## Description

Anagram Finder is a full-stack project that allows users to find all possible anagrams for a given word. The **frontend** is built with **React + TypeScript + Tailwind CSS** using **Vite**, and the **backend** uses **Node.js + TypeScript**. The backend can compute anagrams from a local dictionary (`words.txt`) with caching support and optional remote API fallback.

The project is responsive, animated, and designed for fast problem solving and interactivity.

---

## Tasks

- Implement a backend API that:
  - Validates input (letters only, min 2 characters)
  - Computes anagrams using a local word dictionary
  - Uses caching to optimize repeated queries
  - Optionally fetches from a remote API as fallback
- Implement a frontend that:
  - Allows users to type a word and fetch anagrams
  - Shows loading state and error messages
  - Displays results in a responsive, animated grid
  - Supports debounced input and random test words
  - Provides a copy all functionality

---

## Installation

### Frontend

1: Clone the repository and navigate to the frontend folder:

```bash
git clone <your-repo-url>
cd frontend
```

2: Install dependencies:

```bash
npm install
```

3: Start the development server:

```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

### Backend

1: Navigate to the backend folder:

```bash
cd backend
```

2: Install dependencies:

```bash
npm install
```

3: Place a `words.txt` file in the `backend/data` folder (one word per line).

4: Start the backend server:

```bash
npm run dev
```

The backend will run at `http://localhost:3001`.

---

## About Me

**Vlad-Andrei Gruia**  
MSc in Computer Science, 2025  
Passionate about web development, UI/UX, and algorithmic problem solving. This project is part of a 100-day challenge to improve coding and problem-solving skills.

---

## License

MIT License
