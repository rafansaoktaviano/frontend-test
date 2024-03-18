import create from "zustand";

interface ModalState {
  editModalIsOpen: boolean;
  editInput: string;
  setEditInput: (text: string) => void;
  onOpenEditModal: (task: string, id: number, isCompleted: boolean) => void;
  onCloseEditModal: () => void;
  idTask: number;
}

export const useModalStore = create<ModalState>((set) => ({
  editModalIsOpen: false,
  editInput: "",
  idTask: 0,
  setEditInput: (text: string) => set({ editInput: text }),
  onOpenEditModal: (task: string, id: number, isCompleted: boolean) => {
    set((state) => ({
      editModalIsOpen: true,
      editInput: task,
      idTask: id,
    }));
  },
  onCloseEditModal: () => {
    set((state) => ({
      editModalIsOpen: false,
      editInput: "",
      idTask: 0,
    }));
  },
}));
