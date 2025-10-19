const { runTasks } = require('../index');

test('runs tasks and preserves order', async () => {
  const tasks = [
    () => Promise.resolve(10),
    () => Promise.resolve(20),
    () => Promise.reject('error')
  ];
  const results = await runTasks(tasks, 2);
  expect(results).toEqual([
    { status: 'fulfilled', value: 10 },
    { status: 'fulfilled', value: 20 },
    { status: 'rejected', reason: 'error' }
  ]);
});

test('handles empty array', async () => {
  const results = await runTasks([], 3);
  expect(results).toEqual([]);
});

// New tests

test('respects concurrency', async () => {
  let running = 0;
  let maxRunning = 0;

  const tasks = Array.from({ length: 6 }).map(() => async () => {
    running++;
    maxRunning = Math.max(maxRunning, running);
    await new Promise(res => setTimeout(res, 50));
    running--;
    return true;
  });

  const results = await runTasks(tasks, 3);
  expect(results.every(r => r.status === 'fulfilled')).toBe(true);
  expect(maxRunning).toBeLessThanOrEqual(3);
});

test('handles synchronous tasks', async () => {
  const tasks = [
    () => 1,
    () => 2,
    () => { throw new Error('fail'); }
  ];
  const results = await runTasks(tasks, 2);
  expect(results[0]).toEqual({ status: 'fulfilled', value: 1 });
  expect(results[1]).toEqual({ status: 'fulfilled', value: 2 });
  expect(results[2].status).toBe('rejected');
  expect(results[2].reason.message).toBe('fail');
});

test('all tasks succeed', async () => {
  const tasks = [
    () => Promise.resolve('a'),
    () => Promise.resolve('b'),
    () => Promise.resolve('c')
  ];
  const results = await runTasks(tasks, 2);
  expect(results).toEqual([
    { status: 'fulfilled', value: 'a' },
    { status: 'fulfilled', value: 'b' },
    { status: 'fulfilled', value: 'c' }
  ]);
});

test('all tasks fail', async () => {
  const tasks = [
    () => Promise.reject('err1'),
    () => Promise.reject('err2'),
  ];
  const results = await runTasks(tasks, 1);
  expect(results).toEqual([
    { status: 'rejected', reason: 'err1' },
    { status: 'rejected', reason: 'err2' },
  ]);
});

test('concurrency greater than tasks length', async () => {
  const tasks = [
    () => Promise.resolve(1),
    () => Promise.resolve(2)
  ];
  const results = await runTasks(tasks, 5);
  expect(results).toEqual([
    { status: 'fulfilled', value: 1 },
    { status: 'fulfilled', value: 2 }
  ]);
});

test('handles mixed sync and async tasks', async () => {
  const tasks = [
    () => 1,
    () => Promise.resolve(2),
    () => new Promise(res => setTimeout(() => res(3), 10)),
  ];
  const results = await runTasks(tasks, 2);
  expect(results).toEqual([
    { status: 'fulfilled', value: 1 },
    { status: 'fulfilled', value: 2 },
    { status: 'fulfilled', value: 3 },
  ]);
});
