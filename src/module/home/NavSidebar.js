import React from "react";
import { router_link, TOAST_TYPE } from "../../common ";
import {
  IconDashboard,
  IconMessage,
  IconSignOut,
  IconUsers,
} from "../../components/icon";
import NavItem from "./NavItem";
import { auth } from "../../firebase/firebase-config";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const navBars = [
  {
    id: 1,
    name: "Dashboard",
    icon: <IconDashboard />,
    onClick: () => {},
  },
  {
    id: 2,
    name: "chat",
    icon: <IconMessage />,
    onClick: () => {},
    path: router_link.MESSAGES,
  },
  {
    id: 3,
    name: "Users",
    icon: <IconUsers />,
    onClick: () => {},
    path: router_link.USER,
  },
  {
    id: 4,
    name: "Logout",
    icon: <IconSignOut />,
    onClick: () => {
      signOut(auth);
      toast.success("Sign out success", TOAST_TYPE);
    },
  },
];

const NavSidebar = () => {
  return (
    <>
      <div className="nav border-r-black35 pt-3">
        <div className="w-10 h-10 mx-auto mb-3">
          <img
            className="w-full h-full object-cover rounded-full border-white border"
            src=" https://source.unsplash.com/random"
            alt="avatar"
          />
        </div>
        <div className="border-t-black35 w-10 m-auto mb-3"></div>
        <div className="flex flex-col gap-5 h-screen">
          {navBars.map((item) => (
            <NavItem item={item} key={item.id} onClick={item.onClick}>
              {item.icon}
            </NavItem>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavSidebar;
