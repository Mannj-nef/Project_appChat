import React from "react";

const Image = () => {
  return (
    <div className="flex-1 h-screen  border-blue-400">
      <img
        className="w-full h-full object-cover"
        src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
        alt=""
      />
    </div>
  );
};

export default Image;
