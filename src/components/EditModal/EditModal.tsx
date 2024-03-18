import React, { useState } from "react";
import Modal from "react-modal";
import { MdEdit } from "react-icons/md";
import { useModalStore } from "../../store/modalStore";
import { useTaskStore } from "../../store/taskStore";
import { toastSuccess } from "../../utils/toast";

interface EditModalProps {
  task: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  task,
  isOpen,
  onRequestClose,
}) => {
  const { editInput, setEditInput, idTask, onCloseEditModal } = useModalStore();
  const { confirmEdit } = useTaskStore();

  const handleConfirmEdit = () => {
    confirmEdit(idTask, editInput);
    onCloseEditModal();
    toastSuccess("Edit task success!");
  };

  const customStyles = {
    content: {
      width: "400px",
      height: "auto",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "8px",
      zIndex: "50",
      backgroundColor: "#FFF",
      border: 0,
      padding: 0,
      margin: 0,
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      zIndex: "40",
    },
  };
  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={onRequestClose}>
      <div className="w-full h-full p-4 relative">
        <div className="flex items-center  gap-3">
          <h1 className="font-bold text-[24px]">Edit</h1>
          <MdEdit className="text-[24px]" />
        </div>
        <div className="w-full mt-[20px] bg-[#edeef0] rounded-3xl h-auto relative flex items-center">
          <input
            onChange={(e) => setEditInput(e.target.value)}
            value={editInput}
            type="text"
            className="w-full text-[12px] py-4 outline-none border-none bg-transparent pr-[150px] rounded-l-3xl placeholder:text-slate-600   px-4"
            placeholder="Add your task"
          />
        </div>
        <div className="mt-[50px] flex gap-2">
          <button
            onClick={onCloseEditModal}
            className="w-[50%] border-2 text-[#009EED]/80 border-[#009EED]/80 hover:text-[#009EED]  transform duration-300 hover:border-[#009EED] py-3 rounded-3xl"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmEdit}
            className="w-[50%] py-3 bg-[#009EED]/80 hover:bg-[#009EED] transform duration-300 text-white rounded-3xl"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
