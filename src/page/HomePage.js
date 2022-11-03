import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../module/home/Sidebar";

const HomePage = () => {
  return (
    <div className="flex bg-black17">
      <Sidebar></Sidebar>
      <Outlet></Outlet>
    </div>
  );
};

export default HomePage;
