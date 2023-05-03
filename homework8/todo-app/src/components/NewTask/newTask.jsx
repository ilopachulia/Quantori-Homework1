import React, { useState } from "react";
import Button from "../Button/button";
import Modal from "../Modal/modal";

const NewTask = ({ onAddTask }) => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button
        type="button"
        placeholder="+ New Task"
        styles="newTask"
        onClick={handleButtonClick}
      />
      {showModal && <Modal onAddTask={onAddTask} onClose={handleModalClose} />}
    </div>
  );
};

export default NewTask;
