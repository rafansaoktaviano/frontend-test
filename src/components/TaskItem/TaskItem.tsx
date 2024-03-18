import React from "react";
import { MdEdit } from "react-icons/md";
import { ImCross } from "react-icons/im";
import EditModal from "../EditModal/EditModal";
import { useModalStore } from "../../store/modalStore";

interface TaskItemProps {
  task: string;
  id: number;
  isCompleted: boolean;
  onDelete: (id: number) => void;
  onComplete: (task: string, id: number, isCompleted: boolean) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  id,
  isCompleted,
  onDelete,
  onComplete,
}) => {
  const { editModalIsOpen, onOpenEditModal, onCloseEditModal } =
    useModalStore();
  return (
    <div className="flex justify-between items-center gap-3 my-[20px]">
      <div className="flex items-center gap-3">
        <input
          onClick={() => onComplete(task, id, isCompleted)}
          type="checkbox"
          checked={isCompleted === true ? true : false}
          id={`task-${id}`}
          className="w-[20px] h-[20px]  border-2  rounded-full border-solid checked:bg-[#009EED] outline-none cursor-pointer"
        />
        <label
          className={`${isCompleted ? "line-through" : ""} cursor-pointer`}
          htmlFor={`task-${id}`}
        >
          {task}
        </label>
      </div>
      <div className="flex items-center gap-3">
        <MdEdit
          onClick={() => onOpenEditModal(task, id, isCompleted)}
          className="cursor-pointer text-[18px] hover:scale-125"
        />
        <EditModal
          isOpen={editModalIsOpen}
          onRequestClose={onCloseEditModal}
          task={task}
        />
        <ImCross
          onClick={() => onDelete(id)}
          className="cursor-pointer  hover:scale-125"
        />
      </div>
    </div>
  );
};

export default TaskItem;
