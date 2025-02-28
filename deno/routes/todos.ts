import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const router = new Router();

interface Todo {
    id: string,
    text: string,
}

let todos:Todo[]  = [];

router.get('/todos', (ctx)=>{
    ctx.response.body = { todos: todos };
})

router.post('/todos', async (ctx)=> {
    const body = ctx.request.body({ type: "json" });

    const value = await body.value;

    if (!value.text) {
        ctx.response.status = 400;
        ctx.response.body = { error: "Text field is required" };
        return;
    }


    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: value.text,
    }

    todos.push(newTodo);

    console.log(`newTodo`,newTodo)

    ctx.response.body = {message: "Todo was created", todo: newTodo}
})

router.put('/todos/:todoId', async (ctx)=>{
    const body = ctx.request.body({ type: "json" });

    const value = await body.value;

    const tid = ctx.params.todoId;
    const todoIndex = todos.findIndex((todo)=>{
        return todo.id = tid;
    })
    todos[todoIndex] = {
        id: todos[todoIndex].id,
        text: value.text,
    }

    ctx.response.body = {message: "Todo was updated"}
})

router.delete('/todos/:todoId', (ctx)=>{
    const tid = ctx.params.todoId;

    todos = todos.filter(todo => todo.id !== tid);

    ctx.response.body = {message: "Todo was deleted"}
})

export default router;