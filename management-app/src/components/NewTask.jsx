import { useRef, useState } from "react";
import Button from "./Button";
import Input from "./Input";

export default function NewTask({ onAdd }) {
  const taskTitle = useRef();
  const taskDescription = useRef();

  function handleAddTask() {
    const newTask = {
      title: taskTitle.current.value,
      description: taskDescription.current.value,
    };

    if (!newTask.title.trim()) {
      return;
    }

    onAdd(newTask);

    taskTitle.current.value = "";
    taskDescription.current.value = "";
  }

  return (
    <div className="gap-4">
      <Input ref={taskTitle} label="Title" />
      <Input ref={taskDescription} label="Description" textarea={true} />
      <Button onClick={handleAddTask}>Add Task</Button>
    </div>
  );
}
