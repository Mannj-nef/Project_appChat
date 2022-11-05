import { createContext, useContext, useMemo, useState } from "react";
import { firebase_collection } from "../common ";
import useFirestore from "../hooks/useFirestore";
import { useAuthContext } from "./auth-context";

const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [showDashboard, setShowDashboard] = useState(true);
  const [showMadalAddRoom, setShowModalAddroom] = useState(false);
  const { userInfo } = useAuthContext();

  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: userInfo?.uid,
    };
  }, [userInfo?.uid]);

  const rooms = useFirestore(firebase_collection.ROOMS, roomsCondition);

  const value = {
    showDashboard,
    setShowDashboard,
    rooms,
    showMadalAddRoom,
    setShowModalAddroom,
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
