/**
 * Run tasks with limited concurrency.
 * @param {Array<Function>} tasks - array of async functions () => Promise
 * @param {number} concurrency - max concurrent tasks
 * @returns {Promise<Array<{status: string, value?: any, reason?: any}>>}
 */
async function runTasks(tasks, concurrency = 2) {
  if (!Array.isArray(tasks)) throw new Error('tasks must be an array');
  if (!Number.isInteger(concurrency) || concurrency <= 0) {
    throw new Error('concurrency must be a positive integer');
  }

  // TODO 1: Create an array to hold results in correct order
  const results = [];

  // TODO 2: Track the index of the next task to start
  let nextIndex = 0;

  // TODO 3: Implement a worker function that runs tasks
  async function worker() {
    while (nextIndex < tasks.length) {
      const currentIndex = nextIndex;
      nextIndex++;
      try {
        const value = await tasks[currentIndex]();
        results[currentIndex] = { status: 'fulfilled', value };
      } catch (reason) {
        results[currentIndex] = { status: 'rejected', reason };
      }
    }
  }

  // TODO 4: Start `concurrency` number of workers
  const workers = [];
  for (let i = 0; i < Math.min(concurrency, tasks.length); i++) {
    workers.push(worker());
  }

  // TODO 5: Wait for all workers to finish
  await Promise.all(workers);

  return results;
}

module.exports = { runTasks };
