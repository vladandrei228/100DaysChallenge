# Library Management System CLI - Day 17 of 100 Days of Code Challenge

![100 Days of Code](https://img.shields.io/badge/100%20Days%20of%20Code-17%2F100-brightgreen)

Welcome to **Day 17** of my [100 Days of Code Challenge](https://www.100daysofcode.com/)! As a software developer job hunting, I'm honing my problem-solving skills with daily coding challenges. Today's focus: Building a simple console-based Library Management System in TypeScript/JavaScript.

This project implements a CLI tool for managing books in a library—adding, searching, checking out, and returning them—while practicing TypeScript interfaces, array operations, error handling, and Node.js input handling.

## Problem Statement

You are building a simple **Library Management System** CLI tool in TypeScript for a small community library. The system needs to track books (with title, author, ISBN, and availability status) and allow basic operations like adding books, searching by author or title, and checking out/returning books. The data should be stored in memory (an array of book objects) for this exercise—no persistence required. The challenge is to implement the core functionality while handling edge cases like duplicate ISBNs, case-insensitive searches, and invalid inputs, all within a console-based interface using Node.js.

This problem focuses on:

- TypeScript types and interfaces for data modeling.
- Array manipulation and filtering in JavaScript.
- Basic error handling and user input validation.
- Modular code structure with functions.

## Tasks

1. **Define Data Models**: Create TypeScript interfaces for `Book` (with properties: `title: string`, `author: string`, `isbn: string`, `isAvailable: boolean`) and `Library` (with a `books: Book[]` array).

2. **Implement Core Functions**:
   - `addBook(library: Library, book: Book)`: Add a book to the library, but prevent duplicates based on ISBN (case-insensitive). Return `true` if added, `false` if duplicate.
   - `searchBooks(library: Library, query: string)`: Search for books by title or author (case-insensitive partial match). Return an array of matching books.
   - `checkoutBook(library: Library, isbn: string)`: Mark a book as unavailable if it exists and is available. Return the book object if successful, or `null` if not found/unavailable.
   - `returnBook(library: Library, isbn: string)`: Mark a book as available if it exists. Return the book object if successful, or `null` if not found.

3. **Build the CLI Interface**: Use `process.stdin` and `process.stdout` to create a loop that prompts the user for actions (e.g., 'add', 'search', 'checkout', 'return', 'quit'). Parse user input, call the appropriate functions, and display results or errors (e.g., "Book not found" or "ISBN already exists").

4. **Handle Edge Cases**:
   - Validate ISBN as a 13-digit string (use a simple regex check).
   - For searches, handle empty results gracefully.
   - Exit the loop cleanly on 'quit'.

5. **Test Your Implementation**: Manually test by adding a few books, searching, checking out/returning, and verifying duplicates/errors.

## How to Run

### Prerequisites

- Node.js (v18+)
- npm (comes with Node.js)

### Setup

1. Clone or download this project.
2. Open a terminal in the project root.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the app:

   ```bash
   npm start
   ```

   (Or directly: `npx ts-node library.ts`)

### Usage

- The CLI will prompt for commands: `add`, `search`, `checkout`, `return`, or `quit`.
- Example flow:
  - `add`: Enter title, author, and ISBN (e.g., "The Great Gatsby", "F. Scott Fitzgerald", "9780743273565").
  - `search`: Enter a query like "Gatsby" to find matching books.
  - `checkout`/`return`: Enter an ISBN to update availability.

### Scripts

- `npm start`: Run the app.
- `npm run dev`: Run with auto-reload on changes (if configured).

## Project Structure

```bash
library-challenge/
├── library.ts          
├── package.json        
├── tsconfig.json       
└── README.md           
```
