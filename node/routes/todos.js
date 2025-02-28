const express = require("express");

const router = express.Router();

let todos = [];

router.get("/todos", (req, res) => {
  res.json({todos: todos});
})


router.post("/todos", (req, res) => {
  const newTodo = {
    id: new Date().toISOString(),
    text: req.body.text,
  }
  todos.push(newTodo);
  res.status(201).json({message: "Todo created", todo: newTodo})
})

router.put("/todos/:todoId", (req, res) => {
  const tid = req.params.todoId;
  const todoIndex = todos.findIndex((todo)=>{
    return todo.id = tid;
  })
  todos[todoIndex] = {
    id: todos[todoIndex].id,
    text: req.body.text,
  }
  res.status(201).json({message: "Todo updated"})
})

router.delete("/todos/:todoId", (req, res) => {
  const tid = req.params.todoId;
  todos = todos.filter(item => todo.id !== tid);
  res.status(200).json({message: "Todo deleted"})
})

module.exports = router;
