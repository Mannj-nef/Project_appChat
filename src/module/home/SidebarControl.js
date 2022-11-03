import React from "react";
import { useLocation } from "react-router-dom";
import { router_link } from "../../common ";
import MessagesControl from "../message/MessagesControl";
import UserControl from "../user/UserControl";

const SidebarControl = () => {
  const { pathname } = useLocation();
  return (
    <div className="w-[350px] border-r-black35">
      {pathname === router_link.USER ? (
        <UserControl></UserControl>
      ) : pathname === router_link.MESSAGES ? (
        <MessagesControl></MessagesControl>
      ) : null}
    </div>
  );
};

export default SidebarControl;
