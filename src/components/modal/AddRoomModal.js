import { addDoc, collection, orderBy } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";

import { firebase_collection, TOAST_TYPE } from "../../common ";
import { useAuthContext } from "../../contexts/auth-context";
import { useRoomContext } from "../../contexts/chat-room-context";
import { db } from "../../firebase/firebase-config";
import useFirestore from "../../hooks/useFirestore";
import ModalItem from "./ModalItem";

const colRef = collection(db, firebase_collection.ROOMS);

const AddRoomModal = () => {
  const { userInfo } = useAuthContext();
  const { setShowModalAddroom } = useRoomContext();
  const [listIdUser, setListIdUser] = useState([]);
  const [roomName, setRoomName] = useState("");

  const roomsCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "!=",
      compareValue: userInfo?.uid,
    };
  }, [userInfo?.uid]);

  const users = useFirestore(
    firebase_collection.USERS,
    roomsCondition,
    orderBy("uid", "desc")
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

  const handleAddNewRoom = async (e) => {
    e.preventDefault();
    if (!listIdUser?.length) {
      toast.warning("You need to add at least 1 user", TOAST_TYPE);
      return;
    } else if (!roomName) {
      toast.warning("You need to give the room a name", TOAST_TYPE);
      return;
    }
    const data = {
      displayName: roomName,
      timestamp: serverTimestamp(),
      admins: [userInfo?.uid],
      members: [...listIdUser, userInfo?.uid],
    };
    try {
      await addDoc(colRef, data);
      setRoomName("");
      setListIdUser([]);
      setShowModalAddroom(false);
      toast.success("Add room successfuly", TOAST_TYPE);
    } catch (error) {
      toast.error(error.message, TOAST_TYPE);
    }
  };

  return (
    <ModalItem handleSelectUser={handleSelectUser} users={users}>
      <div className="relative mt-5">
        <form autoComplete="off" onSubmit={handleAddNewRoom}>
          <input
            className="p-3 w-full rounded-2xl bg-black27 text-white"
            type="text"
            placeholder="Room name is required"
            onChange={(e) => setRoomName(e.target.value)}
          />
        </form>
      </div>
    </ModalItem>
  );
};

export default AddRoomModal;
