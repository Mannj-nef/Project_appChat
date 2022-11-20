import React from "react";

import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useRoomContext } from "../../contexts/chat-room-context";

const NavItem = ({ children, item, ...props }) => {
  const { showDashboard, setShowDashboard } = useRoomContext();

  const handleDashboard = (e) => {
    const target = e.target;
    setShowDashboard(!showDashboard);
    target.classList.toggle("text-blue-400");
  };

  if (item.path) {
    return (
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          (isActive
            ? " border-l-blue-500 text-blue-500"
            : "border-l-transparent") +
          " border-l-2 px-5 py-3 cursor-pointer text-white"
        }
        {...props}
      >
        {children}
      </NavLink>
    );
  }
  return (
    <div
      className=" border-l-2 border-l-transparent px-5 py-3 cursor-pointer text-white"
      onClick={
        item.name === "Dashboard" ? (e) => handleDashboard(e) : item.onClick
      }
      {...props}
    >
      {children}
    </div>
  );
};

NavItem.propTypes = {
  children: PropTypes.node,
  item: PropTypes.object,
};

export default NavItem;
