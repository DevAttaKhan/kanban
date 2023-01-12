import React, { useEffect, useContext } from "react";
import TasksList from "./TasksList";
import { AppState } from "../AppContext";
import API from "../api/api";

const Board = () => {
  const { setTasks, token, tasks, rerender } = useContext(AppState);

  useEffect(() => {
    API.get("tasks", {
      headers: {
        authorization: `Bearer ${token?.token}`,
      },
    }).then(({ data }) => setTasks(data.data.tasks));
  }, [token?.token, rerender, setTasks]);

  return (
    <div className="flex">
      <TasksList todoList={tasks} title="todo" />
      <TasksList todoList={tasks} title="progress" />
      <TasksList todoList={tasks} title="done" />
    </div>
  );
};

export default Board;
