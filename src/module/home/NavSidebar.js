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
import { useAuthContext } from "../../contexts/auth-context";

const navBars = [
  {
    id: 1,
    name: "Dashboard",
    icon: <IconDashboard />,
  },
  {
    id: 2,
    name: "chat",
    icon: <IconMessage />,
    path: router_link.MESSAGES,
  },
  {
    id: 3,
    name: "Users",
    icon: <IconUsers />,
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
  const { userInfo } = useAuthContext();

  return (
    <>
      <div className="nav border-r-black35 pt-3 bg-black007a">
        <div title={userInfo.displayName} className="w-10 h-10 mx-auto mb-3">
          <img
            className="w-full h-full object-cover rounded-full border-white border p-1 flex item justify-centerf "
            src={userInfo?.photoURL}
            alt="avatar"
          />
        </div>
        <div className="border-t-black35 w-10 m-auto mb-3"></div>
        <div className="flex flex-col gap-5 ">
          {navBars.map((item) => (
            <NavItem item={item} key={item.id}>
              {item.icon}
            </NavItem>
          ))}
        </div>
        <p className="text-white">{userInfo.displayName}</p>
      </div>
    </>
  );
};

export default NavSidebar;
