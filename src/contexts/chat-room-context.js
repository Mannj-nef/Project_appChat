import { createContext, useContext, useState } from "react";

const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [showDashboard, setShowDashboard] = useState(true);

  const value = { showDashboard, setShowDashboard };
  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

const useRoomContext = () => {
  const context = useContext(RoomContext);

  if (context === undefined)
    throw new Error("useRoomContext must be use within RoomProvider");
};

export { RoomProvider, useRoomContext };
