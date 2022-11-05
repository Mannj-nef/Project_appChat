import React from "react";

const UserItemChart = () => {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 text-white">
        <div className="w-[30px] h-[30px]">
          <img
            className="w-full h-full object-cover rounded-full"
            src="https://source.unsplash.com/random"
            alt=""
          />
        </div>
        <h3>Russel</h3>
        <span>10:02</span>
      </div>
      <div className="mess-content text-white mt-2">
        <p className="bg-black17 p-4 max-w-[400px] w-fit rounded-bl-2xl rounded-r-2xl">
          Lorem ipsum dolor sit lorem .
        </p>
      </div>
    </div>
  );
};

export default UserItemChart;
