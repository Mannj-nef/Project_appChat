import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { db } from "../firebase/firebase-config";
import useFirestore from "../hooks/useFirestore";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "./auth-context";
import { firebase_collection } from "../common ";

const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [showDashboard, setShowDashboard] = useState(true);
  const [showModalAddRoom, setShowModalAddroom] = useState(false);
  const [showModalAddUser, setUseModalAddUser] = useState(false);
  const { userInfo } = useAuthContext();

  const [roomChat, setRoomChat] = useState({});
  const [searchParam] = useSearchParams();
  const idRoom = searchParam.get("room-id");

  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: userInfo?.uid,
    };
  }, [userInfo?.uid]);

  const rooms = useFirestore(firebase_collection.ROOMS, roomsCondition);

  useEffect(() => {
    if (!idRoom) return;
    const docRef = doc(db, firebase_collection.ROOMS, idRoom);
    const unsubscibed = onSnapshot(docRef, (snapshot) => {
      setRoomChat(snapshot.data());
    });
    return unsubscibed;
  }, [idRoom]);

  const value = {
    showDashboard,
    setShowDashboard,
    rooms,
    roomChat,
    showModalAddRoom,
    setShowModalAddroom,
    showModalAddUser,
    setUseModalAddUser,
  };
  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

const useRoomContext = () => {
  const context = useContext(RoomContext);

  if (context === undefined)
    throw new Error("useRoomContext must be use within RoomProvider");

  return context;
};

export { RoomProvider, useRoomContext };
