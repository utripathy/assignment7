const express = require('express');
const app = express();
const PORT = 3000;

let todos = [];

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Home
app.get('/', (req, res) => {
  const filter = req.query.filter;
  const filteredTodos = filter ? todos.filter((t) => t.priority === filter) : todos;
  res.render('index', { todos: filteredTodos, filter });
});

// POST Add Todo
app.post('/add', (req, res) => {
  const { task, priority, filter } = req.body;
  if (task && task.trim()) {
    todos.push({ task: task.trim(), priority });
  }
  res.redirect(filter ? `/?filter=${filter}` : '/');
});

// POST Edit Todo
app.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  const { task, priority, filter } = req.body;
  if (todos[id]) {
    todos[id] = { task: task.trim(), priority };
  }
  res.redirect(filter ? `/?filter=${filter}` : '/');
});

// POST Delete Todo
app.post('/delete/:id', (req, res) => {
  const id = req.params.id;
  const { filter } = req.body;
  todos.splice(id, 1);
  res.redirect(filter ? `/?filter=${filter}` : '/');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
