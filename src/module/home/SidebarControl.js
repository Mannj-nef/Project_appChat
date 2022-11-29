import React from "react";
import { useLocation } from "react-router-dom";
import { router_link } from "../../common ";
import { useRoomContext } from "../../contexts/chat-room-context";
import Roomlist from "../message/Roomlist";

const SidebarControl = () => {
  const { showDashboard } = useRoomContext();
  const { pathname } = useLocation();
  return (
    <>
      {pathname === router_link.MESSAGES ? (
        <div
          className={`w-[350px] border-r-black35 overflow-hidden ${
            showDashboard ? "" : "w-0"
          }`}
        >
          <Roomlist></Roomlist>
        </div>
      ) : null}
    </>
  );
};

export default SidebarControl;
