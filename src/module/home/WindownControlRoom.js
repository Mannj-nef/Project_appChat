import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { query, updateDoc, where } from "firebase/firestore";
import { collection, doc, onSnapshot } from "firebase/firestore";

import LoadingSpiner from "../../components/loading/LoadingSpiner";
import { IconDelete } from "../../components/icon";
import { db } from "../../firebase/firebase-config";
import { firebase_collection, TOAST_TYPE } from "../../common ";
import useLoading from "../../hooks/useLoading";

const WindownControlRoom = (props) => {
  const { showInforRoomChart, idRoom, roomChat } = props;
  const { userInfo, setSearchParam } = props;

  const [userInRoom, setUserInRoom] = useState([]);
  const [userAddminInRoom, serUserAddminInRoom] = useState([]);
  const [isAdminRoom, setIsAdminRoom] = useState(false);

  const { isLoading: LoadingMember } = useLoading(userInRoom);
  const { isLoading: loadingAddmin } = useLoading(userAddminInRoom);

  const handleSetAdmin = async (id) => {
    const arrayAdmins = roomChat?.admins;
    const docRef = doc(db, firebase_collection.ROOMS, idRoom);
    await updateDoc(docRef, {
      admins: [...arrayAdmins, id],
    });
  };

  const handleRemoveAdmin = async (id) => {
    if (roomChat?.admins?.length <= 1) {
      toast.warning("Need at least 1 admin", TOAST_TYPE);
      return;
    }
    const arrayAdmins = roomChat?.admins?.filter((item) => item !== id);
    const docRef = doc(db, firebase_collection.ROOMS, idRoom);
    await updateDoc(docRef, {
      admins: [...arrayAdmins],
    });
  };

  const handleRemoveUser = async (id) => {
    const arrayMember = roomChat?.members?.filter((item) => item !== id);
    const arrayAdmins = roomChat?.admins?.filter((item) => item !== id);

    const docRef = doc(db, firebase_collection.ROOMS, idRoom);
    await updateDoc(docRef, {
      members: arrayMember,
      admins: arrayAdmins,
    });
  };

  const handleOutGroup = async () => {
    const arrayMember = roomChat?.members?.filter(
      (item) => item !== userInfo.uid
    );
    const arrayAdmins = roomChat?.admins?.filter(
      (item) => item !== userInfo.uid
    );

    const adminList = arrayAdmins.length > 0 ? arrayAdmins : [arrayMember[0]];

    const docRef = doc(db, firebase_collection.ROOMS, idRoom);
    await updateDoc(docRef, {
      members: arrayMember,
      admins: adminList,
    });
    setSearchParam();
  };

  const fetchMember = useCallback(
    (queryMember, setUser) => {
      const colRef = collection(db, firebase_collection.USERS);
      if (roomChat?.members?.length > 0) {
        const queryUser = query(colRef, where("uid", "in", queryMember));
        const unsubscibed = onSnapshot(queryUser, (snapShot) => {
          const users = snapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUser(users);
        });
        return unsubscibed;
      }
    },

    [roomChat?.members]
  );

  const handleRemoveImageGroup = () => {};

  // get member room chart
  useEffect(() => {
    fetchMember(roomChat?.members, setUserInRoom);
  }, [fetchMember, roomChat]);

  // get member addmin room chart
  useEffect(() => {
    fetchMember(roomChat?.admins, serUserAddminInRoom);
  }, [fetchMember, roomChat]);

  // check isAdmin
  useEffect(() => {
    const isAdmin = userAddminInRoom.some((admin) => userInfo.uid === admin.id);
    setIsAdminRoom(isAdmin);
  }, [userAddminInRoom, userInfo]);

  return (
    <div
      className={`${
        showInforRoomChart ? "w-[360px] p-3 flex-shrink-0" : " w-0"
      } overflow-hidden `}
    >
      <div className=" text-white h-full py-5 px-2 rounded-lg flex flex-col">
        <div className="flex  items-center justify-center flex-col gap-5">
          <div className="relative group">
            <img
              className="w-[60px] h-[60px] rounded-full"
              src={roomChat?.photoURL}
              alt=""
            />
            <button
              type="button"
              className="absolute bg-opacity-50 bg-white p-1 rounded-full text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block"
              onClick={handleRemoveImageGroup}
            >
              <IconDelete className="w-5 h-5"></IconDelete>
            </button>
          </div>
          <h3>{roomChat?.displayName}</h3>
        </div>
        <div className=" bg-black27 rounded-xl p-5 mt-5">
          <h4 className="font-bold">
            Members: {!LoadingMember ? userInRoom?.length : "..."}
          </h4>
          {!LoadingMember ? (
            userInRoom?.map((user) => (
              <UserItem key={user.id} member={user}>
                {isAdminRoom && (
                  <div className="ml-auto flex items-center gap-2  text-xs">
                    <button
                      className="bg-blue-300 p-1 rounded-md font-medium"
                      onClick={() => handleSetAdmin(user.id)}
                    >
                      {" "}
                      Set admin
                    </button>
                    <button
                      className="bg-red-400 p-1 rounded-md"
                      onClick={() => handleRemoveUser(user.id)}
                    >
                      <IconDelete />
                    </button>
                  </div>
                )}
              </UserItem>
            ))
          ) : (
            <LoadingSpiner />
          )}
        </div>

        <div className=" bg-black27 rounded-xl p-5 mt-5">
          <h4 className="font-bold">Admin {userAddminInRoom.length}</h4>
          {!loadingAddmin ? (
            !!userAddminInRoom.length &&
            userAddminInRoom.map((admin) => (
              <UserItem key={admin.id} member={admin}>
                {isAdminRoom && (
                  <div className="ml-auto flex items-center gap-2  text-xs">
                    <button
                      className="bg-red-400 p-1 rounded-md font-medium"
                      onClick={() => handleRemoveAdmin(admin.id)}
                    >
                      {" "}
                      remove admin
                    </button>
                  </div>
                )}
              </UserItem>
            ))
          ) : (
            <LoadingSpiner />
          )}
        </div>

        <div className="mt-auto">
          <button
            className="bg-red-400 block rounded-lg w-full p-3 font-bold"
            onClick={handleOutGroup}
          >
            Out Group
          </button>
        </div>
      </div>
    </div>
  );
};

const UserItem = ({ member, children }) => {
  return (
    <div key={member.id} className="flex gap-3 mt-5 items-center">
      <img
        className="w-8 h-8 rounded-full"
        src={member.photoURL}
        alt={member.displayName}
      />
      <h3 title={member.displayName}>
        {" "}
        {member.displayName.length >= 10
          ? member.displayName.slice(0, 10) + "..."
          : member.displayName}
      </h3>
      {children}
    </div>
  );
};

WindownControlRoom.propTypes = {
  showInforRoomChart: PropTypes.bool,
  idRoom: PropTypes.string,
  roomChat: PropTypes.object,
  userInfo: PropTypes.object,
  setSearchParam: PropTypes.func,
};

export default WindownControlRoom;
