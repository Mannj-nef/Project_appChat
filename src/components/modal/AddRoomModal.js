import React from "react";
import { firebase_collection } from "../../common ";
import useFirestore from "../../hooks/useFirestore";
import { IconSearch } from "../icon";
import UserRoom from "../userRoom/UserRoom";
import Modal from "./Modal";

const AddRoomModal = () => {
  const users = useFirestore(firebase_collection.USERS);

  return (
    <>
      <Modal>
        <div className="bg-white w-[500px] rounded-xl p-10">
          <div className="relative mt-5">
            <input
              className="p-3 pl-12 w-full rounded-2xl bg-black27"
              type="text"
              placeholder="Search"
            />
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2"></IconSearch>
          </div>
          <div className="mt-5">
            {!!users.length &&
              users.map((item) => (
                <UserRoom key={item.id} room={item}></UserRoom>
              ))}
            {/* <UserRoom></UserRoom>
            <UserRoom></UserRoom> */}
          </div>
          <div className="relative mt-5">
            <input
              className="p-3 pl-12 w-full rounded-2xl bg-black27"
              type="text"
              placeholder="room name"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddRoomModal;
