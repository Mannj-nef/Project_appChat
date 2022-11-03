import React from "react";
import { IconAddRoom, IconSearch } from "../../components/icon";
import UserRoom from "./UserRoom";

const MessagesControl = () => {
  return (
    <div>
      <div className="p-5 text-white">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-lg ">Messages</h2>
          <span>
            <IconAddRoom></IconAddRoom>
          </span>
        </div>
        <div className="relative mt-5">
          <input
            className="p-3 pl-12 w-full rounded-2xl bg-black27"
            type="text"
            placeholder="Search"
          />
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2"></IconSearch>
        </div>
      </div>
      <div className="text-white text-sm">
        <p>PINNED MESSAGE</p>
        <UserRoom></UserRoom>
        <UserRoom active></UserRoom>
      </div>
      <div className="text-white text-sm">
        <p>ALL MESSAGE</p>
      </div>
    </div>
  );
};

export default MessagesControl;
