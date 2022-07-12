import React from 'react';
import { FileDoneOutlined, DeleteOutlined } from "@ant-design/icons";
const TodoList = ({ todos, removeTodo, doneTodo }) => {

    return todos.map((todo, index) => (
        <div className={todo.done ? "Todo done" : "Todo"} key={index}>
            {todo.title}
            <FileDoneOutlined style={{ fontSize: 20, color: "green", margin: '10px' }} onClick={() => doneTodo(todo.id)} />
            <DeleteOutlined style={{ fontSize: 20, color: "red" }} onClick={() => removeTodo(todo.id)} />
        </div>
    ));
}

export default TodoList;