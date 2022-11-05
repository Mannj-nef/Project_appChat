import React from "react";
import { useRoomContext } from "../../contexts/chat-room-context";
import Portal from "../Portal/Portal";

const Modal = ({ children }) => {
  const { showMadalAddRoom, setShowModalAddroom } = useRoomContext();

  const handleClostModal = (e) => {
    const modal = e.target.id;
    if (modal === "modal") setShowModalAddroom(false);
  };
  return (
    <Portal>
      {showMadalAddRoom ? (
        <div
          id="modal"
          className="inset-0 fixed  bg-black35 bg-opacity-40 flex items-center justify-center cursor-pointer"
          onClick={handleClostModal}
        >
          {children}
        </div>
      ) : null}
    </Portal>
  );
};

export default Modal;
