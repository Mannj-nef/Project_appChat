import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useCallback } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { firebase_collection, TOAST_TYPE } from "../../common ";
import Form from "../../components/form/Form";
import { IconDelete, IconSend, IconSetting } from "../../components/icon";
import InputControl from "../../components/input";
import { useAuthContext } from "../../contexts/auth-context";
import { useRoomContext } from "../../contexts/chat-room-context";
import { db } from "../../firebase/firebase-config";
import useFirestore from "../../hooks/useFirestore";
import UserItemChart from "../message/UserItemChart";

const WindownChat = () => {
  const { userInfo } = useAuthContext();
  const { roomChat } = useRoomContext();
  const { setUseModalAddUser } = useRoomContext();
  const [userInRoom, setUserInRoom] = useState([]);
  const [userAddminInRoom, serUserAddminInRoom] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const idRoom = searchParam.get("room-id");
  const [showInforRoomChart, setShowInforRoomChart] = useState(false);

  const messageListRef = useRef(null);

  const { handleSubmit, control, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      message: "",
    },
  });

  const condition = useMemo(() => {
    return {
      fieldName: "romeId",
      operator: "==",
      compareValue: idRoom,
    };
  }, [idRoom]);

  const messageList = useFirestore(firebase_collection.MESSAGE, condition);

  const handleSubmitMessage = async (values) => {
    const { message } = values;
    const colRef = collection(db, firebase_collection.MESSAGE);

    const data = {
      message,
      photoURL: userInfo?.photoURL,
      uid: userInfo?.uid,
      creationTime: serverTimestamp(),
      displayName: userInfo?.displayName,
      romeId: idRoom,
    };
    try {
      await addDoc(colRef, data);
      reset();
    } catch (error) {
      toast.error(error.message, TOAST_TYPE);
      console.log(error);
    }
  };

  const handleSetAdmin = async (id) => {
    const arrayAdmins = roomChat?.admins;
    const docRef = doc(db, firebase_collection.ROOMS, idRoom);
    await updateDoc(docRef, {
      admins: [...arrayAdmins, id],
    });
  };

  const handleRemoveUser = async (id) => {
    const arrayMember = roomChat?.members.filter((item) => item !== id);
    const arrayAdmins = roomChat?.admins.filter((item) => item !== id);

    const docRef = doc(db, firebase_collection.ROOMS, idRoom);
    await updateDoc(docRef, {
      members: arrayMember,
      admins: arrayAdmins,
    });
  };

  const handleOutGroop = async () => {
    const arrayMember = roomChat?.members.filter(
      (item) => item !== userInfo.uid
    );
    const arrayAdmins = roomChat?.admins.filter(
      (item) => item !== userInfo.uid
    );

    const adminList = arrayAdmins.length > 0 ? arrayAdmins : [arrayMember[0]];
    console.log(adminList);

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

  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [messageList]);

  // get member room chart
  useEffect(() => {
    fetchMember(roomChat.members, setUserInRoom);
  }, [fetchMember, roomChat]);

  // get member addmin room chart
  useEffect(() => {
    fetchMember(roomChat.admins, serUserAddminInRoom);
  }, [fetchMember, roomChat]);

  if (!idRoom)
    return (
      <div className="w-[300px] bg-white m-auto rounded-2xl flex items-center justify-center min-h-[300px] p-5">
        Selecter room
      </div>
    );

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 flex flex-col bg-black27">
        <div className="flex justify-between items-center shadow-lg p-5 text-white bg-black35 rounded-tl-3xl rounded-tr-3xl">
          <div className="">
            <h2>{roomChat?.displayName}</h2>
          </div>
          <div className="flex gap-5 items-center ">
            <div
              className=" bg-black27 border border-black17 cursor-pointer py-1 px-4 rounded-md"
              onClick={() => setUseModalAddUser(true)}
            >
              {" "}
              + Add member
            </div>
            <div
              className="bg-red-400 cursor-pointer py-1 px-4 rounded-md"
              onClick={() => setShowInforRoomChart((pre) => !pre)}
            >
              <IconSetting />
            </div>
          </div>
        </div>

        <div className="p-5 flex flex-1 flex-col  justify-end h-[500px] ">
          <div
            ref={messageListRef}
            className="mess-content flex-1 flex flex-col  overflow-auto mb-5"
          >
            {messageList?.length > 0 &&
              messageList?.map((mess) =>
                mess?.uid !== userInfo.uid ? (
                  <UserItemChart
                    key={mess?.id}
                    avatar={mess?.photoURL}
                    text={mess?.message}
                    userName={mess?.displayName}
                    time={mess?.creationTime?.seconds}
                  ></UserItemChart>
                ) : (
                  <UserItemChart
                    isUser
                    key={mess?.id}
                    avatar={mess?.photoURL}
                    text={mess?.message}
                    userName={mess?.displayName}
                    time={mess?.creationTime?.seconds}
                  ></UserItemChart>
                )
              )}
          </div>

          <Form handle={handleSubmit(handleSubmitMessage)}>
            <InputControl
              control={control}
              name="message"
              placeholder="Message..."
              className="pr-20"
            >
              <IconSend></IconSend>
            </InputControl>
          </Form>
        </div>
      </div>

      <div
        className={`${
          showInforRoomChart ? "w-[360px] p-3" : " w-0"
        } overflow-hidden `}
      >
        <div className=" text-white h-full py-5 px-2 rounded-lg flex flex-col">
          <div className="flex  items-center justify-center flex-col gap-5">
            <img
              className="w-[60px] h-[60px] rounded-full"
              src="https://source.unsplash.com/random"
              alt=""
            />
            <h3>{roomChat?.displayName}</h3>
          </div>
          <div className=" bg-black27 rounded-xl p-5 mt-5">
            <h4 className="font-bold">Members: {userInRoom?.length}</h4>
            {userInRoom?.map((user) => (
              <UserItem key={user.id} member={user}>
                {/* bad performance */}
                {!!userAddminInRoom.length &&
                  userAddminInRoom.map(
                    (admin) =>
                      userInfo.uid === admin.id && (
                        <div
                          key={admin.id}
                          className="ml-auto flex items-center gap-2  text-xs"
                        >
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
                      )
                  )}
              </UserItem>
            ))}
          </div>

          <div className=" bg-black27 rounded-xl p-5 mt-5">
            <h4 className="font-bold">Admin</h4>
            {!!userAddminInRoom.length &&
              userAddminInRoom.map((admin) => (
                <UserItem key={admin.id} member={admin}></UserItem>
              ))}
          </div>

          <div className="mt-auto">
            <button
              className="bg-red-400 block rounded-lg w-full p-3 font-bold"
              onClick={handleOutGroop}
            >
              Out Groop
            </button>
          </div>
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
      <h3 title={member.displayName}> {member.displayName.slice(0, 10)}</h3>
      {children}
    </div>
  );
};

export default WindownChat;
