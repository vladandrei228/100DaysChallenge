# 🚀 Day 18 – Debounced Search (React + Tailwind + Express)

## 🧩 Problem Statement

You need to build a **debounced search experience** using React, Tailwind CSS, and a Node.js mock backend.  
When the user types in a search box, the app should:

- Wait a short time (300ms) before fetching results (debouncing).
- Cancel previous requests if a new one starts (AbortController).
- Cache previously searched queries (in-memory cache).
- Handle loading and error states gracefully.
- Clearly show whether results came from cache or network.
- Be visually appealing using Tailwind CSS.
