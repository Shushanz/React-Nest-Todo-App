import { useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const todos = await axios.get("http://localhost:3001/todo");
    setTodos(todos.data);
  };

  const addTodo = (todo) => {
    console.log("todo", todo);
    if (!todo.title) return;
    const newTodos = [todo, ...todos];
    axios.post("http://localhost:3001/todo", todo)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("error");
      });
    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    // const newTodos = [...todos].filter(todo => todo.id !== id);
    console.log("idd", id);
    axios.delete("http://localhost:3001/todo/" + id);
    // .then((res) => {
    //   console.log('res', res)
    // })
    // .catch((err) => {
    //   console.log('error')
    // })
    loadTodos();
    // setTodos(newTodos);
  };

  const doneTodo = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.done = !todo.done;
        console.log("id, todo.done", todo);
        axios.patch("http://localhost:3001/todo", todo)
          .then((res) => {
            console.log("res", res);
          })
          .catch((err) => {
            console.log("error");
          });
      }

      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} removeTodo={removeTodo} doneTodo={doneTodo} />
    </div>
  );
};

export default App;
