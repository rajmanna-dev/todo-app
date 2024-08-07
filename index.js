import express from 'express';
import bodyParser from 'body-parser';
import { readFileSync, writeFile } from 'fs';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const readTodos = () => {
  const todoFile = readFileSync('todo.json', 'utf8');
  return JSON.parse(todoFile);
};

const writeTodos = todos => {
  writeFile('todo.json', JSON.stringify(todos, null, 2), err => {
    if (err) throw err;
    console.log('Todo added successfully.');
  });
};

app.get('/', (req, res) => {
  let todoObj = readTodos();
  res.render('index.ejs', { todo: todoObj });
});

app.post('/todo', (req, res) => {
  let todoObj = readTodos();
  let todoInput = req.body['todo-input'];
  if (todoInput && todoInput != ' ') {
    let newTodo = {
      todoId: Date.now(),
      todoTitle: todoInput,
      todoStatus: false,
    };
    todoObj.push(newTodo);
    writeTodos(todoObj);
  }
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
