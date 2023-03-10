import React, { useState, useContext } from "react";
import { AppState } from "../AppContext";
import Modal from "../components/Modal";
import API from "../api/api";

import { TodoTaskType } from "../models/typeModels";

const TasksList: React.FunctionComponent<{
  todoList: TodoTaskType[];
  title: string;
}> = ({ todoList, title }) => {
  const { token, setRerender } = useContext(AppState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateOnDrage = (status: string, id: string): void => {
    API.patch(
      `tasks/${id}`,
      { status: status },
      {
        headers: {
          authorization: `Bearer ${token?.token}`,
        },
      }
    )
      .then((res) => {
        if (res.data.status === "success") {
          setRerender(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const ondragstart = (e: React.DragEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const id = target.dataset.id as string;
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id: string = e.dataTransfer.getData("text/plain");

    // console.log(e.currentTarget.classList);
    if (e.currentTarget.classList.contains("progress")) {
      updateOnDrage("progress", id);
    } else if (e.currentTarget.classList.contains("todo")) {
      updateOnDrage("todo", id);
    } else if (e.currentTarget.classList.contains("done")) {
      updateOnDrage("done", id);
    }
  };

  return (
    <>
      <div
        className={`flex flex-col flex-auto items-center gap-5  border min-h-screen p-3 ${title}`}
        onDrop={(e) => onDrop(e)}
        onDragOver={onDragOver}
        onDragStart={ondragstart}
      >
        <h2 className="p-2 text-gray-500 capitalize text-lg">{title}</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-2 bg-yellow-800 hover:bg-yellow-600 w-full text-white"
        >
          Create new Task
        </button>
        {todoList.map((el) => {
          if (title.toLowerCase() === el.status) {
            return (
              <div
                draggable
                data-id={el._id}
                key={el._id}
                className="p-2 bg-slate-200 w-full cursor-pointer "
              >
                <div className="mb-1">
                  {new Date(el.dueDate).toLocaleDateString()}
                </div>
                <div> {el.description}</div>
              </div>
            );
          } else return null;
        })}
      </div>

      {isModalOpen && <Modal closeModal={setIsModalOpen} status={title} />}
    </>
  );
};

export default TasksList;
