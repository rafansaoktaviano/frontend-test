import { create } from "zustand";

interface Task {
  task: string;
  isCompleted: boolean;
}

interface Store {
  taskList: Task[];
}

const list = localStorage.getItem("todolist");

export const useTaskStore = create<Store>()((set) => ({
  taskList: list ? JSON.parse(list) : [],
}));
