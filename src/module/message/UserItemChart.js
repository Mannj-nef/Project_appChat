import React, { memo } from "react";
import PropTypes from "prop-types";

const UserItemChart = ({
  userName,
  text,
  time,
  avatar,
  isUser,
  image = "",
}) => {
  const handleFormatTime = (seconds) => {
    if (!seconds) return "";
    return new Date(seconds * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div className={`${isUser ? "mt-4 ml-auto" : "mt-3"}`}>
        <div
          className={`${
            isUser ? " justify-end " : ""
          } gap-3 text-white flex items-center`}
        >
          {isUser ? (
            <>
              <span>{handleFormatTime(time)}</span>
              <h3>{userName || "name"}</h3>
              {/* <div className="w-[30px] h-[30px]">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={avatar}
                  alt="avatar"
                />
              </div> */}
            </>
          ) : (
            <>
              <div className="w-[30px] h-[30px]">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={avatar}
                  alt="avatar"
                />
              </div>
              <h3>{userName || "name"}</h3>
              <span>{handleFormatTime(time)}</span>
            </>
          )}
        </div>

        <div className="mess-content text-white mt-2">
          <p
            className={` ${
              isUser
                ? "ml-auto rounded-br-2xl rounded-l-2xl"
                : " rounded-bl-2xl rounded-r-2xl"
            } bg-black17 py-2 px-5 max-w-[400px] w-fit mt-3`}
          >
            {text}
          </p>
          {image && (
            <img
              className={`${
                isUser ? " ml-auto" : " mr-auto"
              } mt-2 rounded-xl w-[200px] h-[200px] object-cover`}
              src={image}
              alt=""
            />
          )}
        </div>
      </div>
    </>
  );
};

UserItemChart.propTypes = {
  avata: PropTypes.string,
  userName: PropTypes.string,
  text: PropTypes.any,
  time: PropTypes.number,
  isUser: PropTypes.bool,
};

export default memo(UserItemChart);
