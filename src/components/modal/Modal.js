import React from "react";
import { useRoomContext } from "../../contexts/chat-room-context";
import Portal from "../Portal/Portal";
import AddUserModal from "./AddUserModal";
import AddRoomModal from "./AddRoomModal";

const Modal = () => {
  const {
    showModalAddRoom,
    setShowModalAddroom,
    showModalAddUser,
    setUseModalAddUser,
  } = useRoomContext();

  const handleClostModal = (e) => {
    const modal = e.target.id;
    if (modal === "modal")
      if (showModalAddRoom) {
        setShowModalAddroom(false);
        return;
      } else if (showModalAddUser) {
        setUseModalAddUser(false);
      }
  };

  const isShowModal = showModalAddRoom || showModalAddUser;
  return (
    <>
      {isShowModal && (
        <Portal>
          <div
            id="modal"
            className="inset-0 fixed  bg-black35 bg-opacity-40 flex items-center justify-center cursor-pointer"
            onClick={handleClostModal}
          >
            {showModalAddRoom ? (
              <AddRoomModal />
            ) : showModalAddUser ? (
              <AddUserModal />
            ) : null}
          </div>
        </Portal>
      )}
    </>
  );
};

export default Modal;
