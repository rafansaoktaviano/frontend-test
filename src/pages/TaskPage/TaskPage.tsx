import React from "react";
import { useTaskStore } from "../../zustand/zustand";

const TaskPage = () => {
  const taskList = useTaskStore((state) => state.taskList);

  console.log(taskList);

  return (
    <div className="w-full min-h-screen flex justify-center items-center ">
      <div className="w-[500px] h-auto bg-white rounded-[10px]">
        <h1>Todo List</h1>
      </div>
    </div>
  );
};

export default TaskPage;
