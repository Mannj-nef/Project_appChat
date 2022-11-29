import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

import { IconDashboard, IconMessage } from "../../components/icon";
import { IconSignOut, IconUserCircle, IconUsers } from "../../components/icon";

import NavItem from "./NavItem";
import { firebase_collection, router_link, TOAST_TYPE } from "../../common ";
import { auth } from "../../firebase/firebase-config";
import { useAuthContext } from "../../contexts/auth-context";
import useFirestore from "../../hooks/useFirestore";

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
  const navigate = useNavigate();

  const condition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "==",
      compareValue: userInfo.uid,
    };
  }, [userInfo.uid]);

  const user = useFirestore(firebase_collection.USERS, condition);

  return (
    <>
      <div className="nav flex flex-col justify-between border-r-black35 pt-3 bg-black007a">
        <div>
          <div
            title={user[0]?.displayName || userInfo?.displayName}
            className="w-10 h-10 mx-auto mb-3"
          >
            <img
              className="w-full h-full object-cover rounded-full border-white border p-1 flex item justify-centerf "
              src={user[0]?.photoURL || userInfo?.photoURL}
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
        </div>

        <div className="mt-auto mb-5 text-white ">
          <div
            title="Go to profile"
            className="flex justify-center items-center cursor-pointer opacity-70 hover:opacity-100"
            onClick={() => navigate(router_link.PROFILE)}
          >
            <IconUserCircle className="w-8 h-8"></IconUserCircle>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavSidebar;
