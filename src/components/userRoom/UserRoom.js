import React from "react";
import PropTypes from "prop-types";

const UserRoom = ({ active, room }) => {
  return (
    <div
      className={`flex gap-5 px-5 py-3 items-center mx-2 cursor-pointer ${
        active ? "bg-black27 rounded-2xl" : ""
      }`}
    >
      <div className="w-[60px] h-[60px]">
        <img
          className="w-full h-full rounded-full object-cover border-white"
          src={`${room?.photoURL || "https://source.unsplash.com/random"}`}
          alt=""
        />
      </div>
      <div className="flex-1">
        <div className="flex flex-1 items-center justify-between">
          <h3 className="font-semibold text-lg">
            {room?.displayName || "Emilia"}
          </h3>
          <span>01:31</span>
        </div>
        <p>Sent image</p>
      </div>
    </div>
  );
};

UserRoom.propTypes = {
  active: PropTypes.bool,
  room: PropTypes.object,
};

export default UserRoom;
