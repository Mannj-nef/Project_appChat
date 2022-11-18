import React, { useMemo, useState } from "react";
import ModalItem from "./ModalItem";
import useFirestore from "../../hooks/useFirestore";
import { firebase_collection, TOAST_TYPE } from "../../common ";
import { useAuthContext } from "../../contexts/auth-context";
import { useRoomContext } from "../../contexts/chat-room-context";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { useSearchParams } from "react-router-dom";

const AddUserModal = () => {
  const { userInfo } = useAuthContext();
  const { roomChat, setUseModalAddUser } = useRoomContext();
  const [searchParam] = useSearchParams();
  const idRoom = searchParam.get("room-id");

  const [listIdUser, setListIdUser] = useState([]);

  const roomsCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "!=",
      compareValue: userInfo?.uid,
    };
  }, [userInfo?.uid]);

  // const users = [];

  const users = useFirestore(firebase_collection.USERS, roomsCondition).filter(
    (user) => !roomChat?.members.includes(user.id)
  );

  const handleSelectUser = (e, id) => {
    e.target.classList.toggle("active-user");
    const hasClass = e.target.classList.contains("active-user");
    if (hasClass) {
      setListIdUser((prevUser) => [...prevUser, id]);
    } else {
      const roomListId = listIdUser.filter((item) => item !== id);
      setListIdUser(roomListId);
    }
  };

  const handleAddNewMember = async () => {
    if (!listIdUser.length) {
      toast.error("choose at least one user", TOAST_TYPE);
      return;
    }
    const docRef = doc(db, firebase_collection.ROOMS, idRoom);
    await updateDoc(docRef, {
      members: [...roomChat?.members, ...listIdUser],
    });
    setUseModalAddUser(false);
  };

  return (
    <ModalItem handleSelectUser={handleSelectUser} users={users}>
      <div className="text-center p-5 rounded-xl bg-blue-500 text-white font-bold">
        <button onClick={handleAddNewMember}>Add new member</button>
      </div>
    </ModalItem>
  );
};

AddUserModal.propTypes = {};

export default AddUserModal;
