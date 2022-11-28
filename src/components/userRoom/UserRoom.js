import React from "react";
import PropTypes from "prop-types";

const UserRoom = ({ active, room, onClick, className = "" }) => {
  return (
    <div
      onClick={onClick}
      className={`flex gap-5 my-5 px-5 py-3  items-center mx-2 cursor-pointer ${
        active ? "bg-black27 rounded-2xl" : ""
      } ${className}`}
    >
      <div className="w-[60px] h-[60px]  p-1 border-white rounded-full pointer-events-none">
        <img
          className="w-full h-full rounded-full object-cover"
          src={`${
            room?.photoURL ||
            "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Z3JvdXAlMjBtZXNzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          }`}
          alt=""
        />
      </div>
      <div className="flex-1 pointer-events-none">
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
  className: PropTypes.string,
  active: PropTypes.bool,
  room: PropTypes.object,
  onClick: PropTypes.func,
};

export default UserRoom;
