import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { router_link } from "../common ";
import { useAuthContext } from "../contexts/auth-context";
import Sidebar from "../module/home/Sidebar";

const HomePage = () => {
  const { userInfo } = useAuthContext();
  const navigate = useNavigate();

  // console.log(userInfo);

  if (!userInfo) {
    console.log(userInfo);
    navigate(router_link.SIGN_IN);
    return;
  }
  return (
    <div className="flex bg-black17 h-screen">
      <Sidebar></Sidebar>
      <Outlet></Outlet>
    </div>
  );
};

export default HomePage;
