import React from "react";
import { useLocation } from "react-router-dom";
import { router_link } from "../../common ";
import { useRoomContext } from "../../contexts/chat-room-context";
import Roomlist from "../message/Roomlist";
import UserControl from "../user/UserControl";

const SidebarControl = () => {
  const { showDashboard } = useRoomContext();
  const { pathname } = useLocation();
  return (
    <div
      className={`w-[350px] border-r-black35 overflow-hidden ${
        showDashboard ? "" : "w-0"
      }`}
    >
      {pathname === router_link.USER ? (
        <UserControl></UserControl>
      ) : pathname === router_link.MESSAGES ? (
        <Roomlist></Roomlist>
      ) : null}
    </div>
  );
};

export default SidebarControl;
