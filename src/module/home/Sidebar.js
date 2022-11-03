import React from "react";
import NavSidebar from "./NavSidebar";
import SidebarControl from "./SidebarControl";

const Sidebar = () => {
  return (
    <div className="flex">
      <NavSidebar></NavSidebar>
      <SidebarControl></SidebarControl>
    </div>
  );
};

export default Sidebar;
