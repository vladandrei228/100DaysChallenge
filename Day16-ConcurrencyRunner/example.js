const { runTasks } = require('./index');

const tasks = [
  () => Promise.resolve(1),
  () => Promise.resolve(2),
  () => Promise.reject('fail'),
  () => new Promise(res => setTimeout(() => res(4), 500)),
];

runTasks(tasks, 2).then(results => {
  console.log(results);
});
