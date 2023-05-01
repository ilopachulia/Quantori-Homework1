import React, { useState } from "react";
import Button from "../Button/Button";
import Modal from "../Modal/modal";

const NewTask = () => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
    console.log("click");
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
      {showModal && <Modal onClose={handleModalClose} />}
    </div>
  );
};

export default NewTask;
