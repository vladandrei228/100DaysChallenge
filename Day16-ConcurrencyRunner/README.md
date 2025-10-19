# Day 16 - JS Concurrency Runner

**Project:** Day 16 of 100 Days of Code Challenge (JavaScript)

---

## Problem Statement

Implement a function `runTasks(tasks, concurrency)` that runs an array of asynchronous functions with a **limited number of concurrent tasks**. The function should:

- Run tasks in parallel, up to a maximum of `concurrency` at a time.
- Preserve the order of results according to the original tasks array.
- Handle both resolved and rejected promises.

This exercise helps practice **async/await**, **Promises**, and **concurrency control** in pure JavaScript.

---

## Tasks

1. Implement `runTasks(tasks, concurrency)` in `day16.js`:
   - `tasks`: an array of functions returning promises (`() => Promise<any>`)
   - `concurrency`: maximum number of tasks to run simultaneously (default: 2)
   - Returns a Promise resolving to an array of results in order:

     ```js

     [
       { status: 'fulfilled', value: ... },
       { status: 'rejected', reason: ... },
       ...
     ]

     ```

2. Ensure at most `concurrency` tasks run at the same time.
3. Handle synchronous and asynchronous tasks, and both success and failure cases.
4. (Optional) Write Jest tests to validate concurrency, error handling, and order preservation.

---

## How to Run

### 1. Clone or create project folder

```bash
mkdir Day16-ConcurrencyRunner
cd Day16-ConcurrencyRunner
```

### 2. Initialize Node.js project

```bash
npm init -y
```

### 3. Install development dependencies (Jest for testing)

```bash
npm install --save-dev jest
```

### 4. Add project files

- `day16.js` – contains the `runTasks` function (implement TODOs)
- `example.js` – demo to run the function
- `tests/day16.test.js` – Jest test skeleton

### 5. Run demo

```bash
node example.js
```

### 6. Run tests

```bash
npx jest
```

---

**Notes:**

- This project is Day 16 of the **100 Days of Code Challenge**.
- Focuses on problem solving with pure JavaScript, async/await, and concurrency.
