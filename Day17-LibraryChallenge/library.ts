// library.ts
import * as readline from 'readline';

// Interfaces (Task 1)
interface Book {
  title: string;
  author: string;
  isbn: string;
  isAvailable: boolean;
}

interface Library {
  books: Book[];
}

// Starter library instance
const library: Library = {
  books: []
};

// Function stubs (Task 2)
function addBook(library: Library, book: Book): boolean {
  // TODO: Check for duplicate ISBN (case-insensitive)
  // If no duplicate, add to books and return true
  // Else return false
  for (const existingBook of library.books) {
    if (existingBook.isbn.toLowerCase() === book.isbn.toLowerCase()) {
        console.log('Duplicate ISBN found. Book not added.');
      return false;
    }
  }
  if (isValidISBN(book.isbn)) {
    library.books.push(book);
    console.log('Book added successfully.');
    return true;
  }
  return false;
}

function searchBooks(library: Library, query: string): Book[] {
  // TODO: Filter books where title or author contains query (case-insensitive)
  // Return matching array
  const filteredBooks = library.books.filter((book) => {
    return (
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    )
  })
  return filteredBooks;
}

function checkoutBook(library: Library, isbn: string): Book | null {
  // TODO: Find book by ISBN (case-insensitive)
  // If found and available, set isAvailable = false and return the book
  // Else return null
  const book = library.books.find((b) => b.isbn.toLowerCase() === isbn.toLowerCase());
  if (book && book.isAvailable) {
    book.isAvailable = false;
    console.log('Book checked out successfully.');
    return book;
  }
  console.log('Book not found or already checked out.');
  return null;
}

function returnBook(library: Library, isbn: string): Book | null {
  // TODO: Find book by ISBN (case-insensitive)
  // If found, set isAvailable = true and return the book
  // Else return null
  const book = library.books.find((b) => b.isbn.toLowerCase() === isbn.toLowerCase());
  if (book) {
    book.isAvailable = true;
    console.log('Book returned successfully.');
    return book;
  }
  console.log('Book not found.');
  return null;
}

// Helper to validate ISBN (Task 3)
function isValidISBN(isbn: string): boolean {
  // TODO: Simple regex check for 13 digits (e.g., /^\d{13}$/)
  // Return true if valid, false otherwise
  if (/^\d{13}$/.test(isbn)) {
    console.log('ISBN is valid.');
    return true;
  }
  console.log('Invalid ISBN.');
  return false;
}

// CLI Setup (Partial - Task 3)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log('\n--- Library Management System ---');
  console.log('Commands: add, search, checkout, return, quit');
  rl.question('Enter command: ', handleInput);
}

function handleInput(input: string) {
  const cmd = input.trim().toLowerCase();
  
  switch (cmd) {
    case 'add':
      // Prompt for title, then author, then isbn (nested callbacks)
      rl.question('Enter book title: ', (title: string) => {
        if (!title.trim()) {
          console.log('Title cannot be empty. Try again.');
          showMenu(); // Loop back on error
          return;
        }
        
        rl.question('Enter book author: ', (author: string) => {
          if (!author.trim()) {
            console.log('Author cannot be empty. Try again.');
            showMenu();
            return;
          }
          
          rl.question('Enter ISBN (13 digits): ', (isbn: string) => {
            if (!isValidISBN(isbn)) {
              console.log('Invalid ISBN. Must be exactly 13 digits. Try again.');
              showMenu();
              return;
            }
            
            // Create Book object (default available)
            const book: Book = {
              title: title.trim(),
              author: author.trim(),
              isbn: isbn.trim(),
              isAvailable: true
            };
            
            // Call addBook and show result
            const added = addBook(library, book);
            if (added) {
              console.log(`Book "${book.title}" by ${book.author} added successfully!`);
            } else {
              console.log(`Book with ISBN ${book.isbn} already exists. Not added.`);
            }
            
            // Loop back AFTER processing
            showMenu();
          });
        });
      });
      break; // Important: break prevents falling through

    case 'search':
      rl.question('Enter search query (title or author): ', (query: string) => {
        if (!query.trim()) {
          console.log('Query cannot be empty. Try again.');
          showMenu();
          return;
        }
        
        const results = searchBooks(library, query.trim());
        if (results.length === 0) {
          console.log('No books found matching your query.');
        } else {
          console.log(`Found ${results.length} book(s):`);
          results.forEach((book, index) => {
            console.log(`${index + 1}. "${book.title}" by ${book.author} (ISBN: ${book.isbn}) - ${book.isAvailable ? 'Available' : 'Checked out'}`);
          });
        }
        
        showMenu(); // Loop back
      });
      break;

    case 'checkout':
      rl.question('Enter ISBN to checkout: ', (isbn: string) => {
        if (!isValidISBN(isbn)) {
          console.log('Invalid ISBN. Must be exactly 13 digits.');
          showMenu();
          return;
        }
        
        const book = checkoutBook(library, isbn.trim());
        if (book) {
          console.log(`"${book.title}" by ${book.author} checked out successfully!`);
        } else {
          console.log(`Book with ISBN ${isbn} not found or already checked out.`);
        }
        
        showMenu();
      });
      break;

    case 'return':
      rl.question('Enter ISBN to return: ', (isbn: string) => {
        if (!isValidISBN(isbn)) {
          console.log('Invalid ISBN. Must be exactly 13 digits.');
          showMenu();
          return;
        }
        
        const book = returnBook(library, isbn.trim());
        if (book) {
          console.log(`"${book.title}" by ${book.author} returned successfully!`);
        } else {
          console.log(`Book with ISBN ${isbn} not found.`);
        }
        
        showMenu();
      });
      break;

    case 'quit':
      console.log('Goodbye!');
      rl.close();
      return; // Exit without looping

    default:
      console.log('Invalid command. Try again.');
      showMenu(); // Loop back on invalid
  }
}

// Start the app
console.log('Welcome to the Library Management System!');
showMenu();