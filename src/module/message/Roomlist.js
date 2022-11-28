import React from "react";
import { IconAddRoom, IconSearch } from "../../components/icon";
import { useRoomContext } from "../../contexts/chat-room-context";
import UserRoom from "../../components/userRoom";
import { useSearchParams } from "react-router-dom";
import LoadingSpiner from "../../components/loading/LoadingSpiner";
import useLoading from "../../hooks/useLoading";

const Roomlist = () => {
  const { rooms, setShowModalAddroom } = useRoomContext();
  const { isLoading } = useLoading(rooms);
  const [, setSearchParam] = useSearchParams();

  return (
    <div>
      <div className="p-5 text-white">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-lg ">Messages</h2>
          <span
            className="cursor-pointer"
            onClick={() => setShowModalAddroom(true)}
          >
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
      {/* <div className="text-white text-sm">
        <p>PINNED MESSAGE</p>
        <UserRoom></UserRoom>
        <UserRoom active></UserRoom>
      </div> */}

      {/* LIST ROMMS */}
      {!isLoading ? (
        !!rooms?.length && (
          <div className="text-white text-sm">
            <p>ALL MESSAGE</p>
            {rooms.map((room) => (
              <UserRoom
                key={room.id}
                room={room}
                onClick={() => setSearchParam(`?room-id=${room.id}`)}
              ></UserRoom>
            ))}
          </div>
        )
      ) : (
        <LoadingSpiner />
      )}
    </div>
  );
};

export default Roomlist;
