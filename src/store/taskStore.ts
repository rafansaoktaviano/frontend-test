import create from "zustand";

type Task = {
  id: number;
  task: string;
  isCompleted: boolean;
};

type TaskStore = {
  taskList: Task[];
  addTask: (text: string) => void;
  deleteTask: (id: number) => void;
  completedTask: (id: number) => void;
  confirmEdit: (id: number, text: string) => void;
};

const list = localStorage.getItem("todolist");

export const useTaskStore = create<TaskStore>((set) => ({
  taskList: list ? JSON.parse(list) : [],

  addTask: (text: string) => {
    set((state) => ({
      taskList: [
        ...state.taskList,
        {
          id:
            state.taskList.length > 0
              ? state.taskList[state.taskList.length - 1].id + 1
              : state.taskList.length + 1,
          task: text,
          isCompleted: false,
        },
      ],
    }));
  },
  deleteTask: (id: number) => {
    set((state) => ({
      taskList: state.taskList.filter((value) => value.id !== id),
    }));
  },
  completedTask: (id: number) => {
    set((state) => ({
      taskList: state.taskList.map((value) =>
        value.id === id ? { ...value, isCompleted: !value.isCompleted } : value
      ),
    }));
  },
  confirmEdit: (id: number, text: string) => {
    set((state) => ({
      taskList: state.taskList.map((value) =>
        value.id === id ? { ...value, task: text } : value
      ),
    }));
  },
}));
