import React, { ChangeEvent, useEffect, useState } from "react";
import { useTaskStore } from "../../store/taskStore";
import books from "./../../assets/booksbg.png";
import { MdEdit } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { toastError, toastSuccess } from "../../utils/toast";
import TaskItem from "../../components/TaskItem/TaskItem";

const TaskPage = () => {
  const [taskInput, setTaskInput] = useState<string>("");
  const { addTask, taskList, deleteTask, completedTask } = useTaskStore();
  console.log(taskList);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskInput) return toastError("Task cannot be empty");
    addTask(taskInput);
    toastSuccess(`${taskInput} task has been added`);
    setTaskInput("");
  };

  const handleDelete = (id: number) => {
    deleteTask(id);
    toastSuccess("Deleted Success");
  };

  const handleCompleteTask = (
    task: string,
    id: number,
    isCompleted: boolean
  ) => {
    completedTask(id);
    if (isCompleted === false) {
      toastSuccess(`${task} has been completed`);
    }
  };

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(taskList));
  }, [taskList]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center ">
      <div className="w-[500px] h-auto p-[20px] bg-white rounded-[10px]">
        <div className="flex items-center ">
          <h1 className="font-bold text-[24px]">To Do List</h1>
          <img src={books} className="w-[50px] " alt="" />
        </div>
        <form
          onSubmit={handleSubmit}
          action=""
          className="w-full bg-[#edeef0] rounded-3xl h-auto relative flex items-center"
        >
          <input
            onChange={(e) => setTaskInput(e.target.value)}
            value={taskInput}
            type="text"
            className="w-full cursor-pointer text-[12px] py-2 outline-none border-none bg-transparent pr-[150px] rounded-l-3xl placeholder:text-slate-600   px-4"
            placeholder="Add your task"
          />

          <button className="py-3 font-semibold px-12 ml-[-20%] bg-[#009EED] text-white rounded-3xl">
            Add
          </button>
        </form>
        {taskList.map((value, index) => {
          return (
            <TaskItem
              task={value.task}
              id={value.id}
              isCompleted={value.isCompleted}
              onDelete={handleDelete}
              onComplete={(task, id, isCompleted) =>
                handleCompleteTask(task, id, isCompleted)
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default TaskPage;
