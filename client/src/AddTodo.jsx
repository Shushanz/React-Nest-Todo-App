import { useState } from "react";
import { Button, Form, Input } from "antd";

const AddTodo = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onFinish = () => {
    if (value.trim()) {
      addTodo({
        id: Date.now(),
        title: value,
        done: false,
      });
    }
    setValue("");
  };

  return (
    <Form onFinish={onFinish}>
      <Input
        type="text"
        placeholder="Add ToDo"
        style={{ width: "300px" }}
        value={value}
        onChange={handleChange}
      />
      <Button type="primary" htmlType="submit">
        Add ToDo
      </Button>
    </Form>
  );
};

export default AddTodo;
