import { addDoc } from "firebase/firestore";
import { doc, collection, onSnapshot, orderBy } from "firebase/firestore";
import { query, serverTimestamp, updateDoc, where } from "firebase/firestore";

import React, { useCallback } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

import ReactQuill from "react-quill";
import parse from "html-react-parser";
// import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { firebase_collection, role_room, TOAST_TYPE } from "../../common ";
// import Form from "../../components/form/Form";
// import InputControl from "../../components/input";
import { IconDelete, IconSend, IconSetting } from "../../components/icon";
import LoadingSpiner from "../../components/loading/LoadingSpiner";
import { useAuthContext } from "../../contexts/auth-context";
import { useRoomContext } from "../../contexts/chat-room-context";
import { db } from "../../firebase/firebase-config";
import useFirestore from "../../hooks/useFirestore";
import useLoading from "../../hooks/useLoading";
import UserItemChart from "../message/UserItemChart";
import InputFileUploadImage from "../../components/input/InputFileUploadImage";
import useImageUpload from "../../hooks/useImageUpload";

const WindownChat = () => {
  const { userInfo } = useAuthContext();
  const { roomChat } = useRoomContext();

  const [valueMessage, setValueMessage] = useState("");

  const { setUseModalAddUser } = useRoomContext();

  const [userInRoom, setUserInRoom] = useState([]);
  const [userAddminInRoom, serUserAddminInRoom] = useState([]);

  const [showInforRoomChart, setShowInforRoomChart] = useState(false);
  const [isAdminRoom, setIsAdminRoom] = useState(false);

  const messageListRef = useRef(null);
  const roomChart = useRef(null);

  const [searchParam, setSearchParam] = useSearchParams();
  const idRoom = searchParam.get("room-id");

  // const { handleSubmit, control, reset } = useForm({
  //   mode: "onChange",
  //   defaultValues: {
  //     message: "",
  //   },
  // });

  const condition = useMemo(() => {
    return {
      fieldName: "romeId",
      operator: "==",
      compareValue: idRoom,
    };
  }, [idRoom]);

  const messageList = useFirestore(
    firebase_collection.MESSAGE,
    condition,
    orderBy("timestamp", "asc")
  );

  const { isLoading: loadingMessage } = useLoading(messageList);
  const { isLoading: LoadingMember } = useLoading(userInRoom);
  const { isLoading: loadingAddmin } = useLoading(userAddminInRoom);

  const {
    imageUrlFile,
    handleSelectImage,
    handleRemoveImageFile,
    setImageUrlFile,
  } = useImageUpload();

  const handleUploadMess = (value) => {
    setValueMessage(value);
    // check enter submit;
    console.log({ value });
  };

  const handleSubmitMessage = async () => {
    const regexLengthMess = /<p>[\s]*<\/p>/g;
    const regexBr = /<p><br[\/]?><[\/]?p>/;
    const colRef = collection(db, firebase_collection.MESSAGE);
    if (
      !valueMessage.match(regexLengthMess) &&
      !valueMessage.match(regexBr) &&
      valueMessage.length > 0
    ) {
      const data = {
        image: imageUrlFile,
        message: valueMessage,
        photoURL: userInfo?.photoURL,
        uid: userInfo?.uid,
        timestamp: serverTimestamp(),
        displayName: userInfo?.displayName,
        romeId: idRoom,
      };
      try {
        await addDoc(colRef, data);
        setValueMessage("");
        setImageUrlFile("");
      } catch (error) {
        toast.error(error.message, TOAST_TYPE);
        console.log(error);
      }
    } else {
      toast.warning("Need to enter value", TOAST_TYPE);
    }
  };

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

  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [messageList]);

  // get member room chart
  useEffect(() => {
    fetchMember(roomChat?.members, setUserInRoom);
  }, [fetchMember, roomChat]);

  // get member addmin room chart
  useEffect(() => {
    fetchMember(roomChat?.admins, serUserAddminInRoom);
  }, [fetchMember, roomChat]);

  useEffect(() => {
    const isAdmin = userAddminInRoom.some((admin) => userInfo.uid === admin.id);
    setIsAdminRoom(isAdmin);
  }, [userAddminInRoom, userInfo]);

  if (!idRoom)
    return (
      <div className="w-[300px] bg-white m-auto rounded-2xl flex items-center justify-center min-h-[300px] p-5">
        Selecter room
      </div>
    );

  return (
    <div className="flex w-full overflow-hidden">
      <div className={`flex flex-col bg-black27 w-full`}>
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

        <div
          ref={roomChart}
          className="p-5 flex flex-1 flex-col  justify-end h-[500px] "
        >
          <div
            ref={messageListRef}
            className="mess-content flex-1 flex flex-col  overflow-y-auto overflow-x-hidden p-5  mb-5"
          >
            {!loadingMessage ? (
              messageList?.length > 0 &&
              messageList?.map((mess) =>
                mess?.uid !== userInfo.uid ? (
                  <UserItemChart
                    key={mess?.id}
                    avatar={mess?.photoURL}
                    image={mess?.image}
                    text={parse(mess?.message)}
                    userName={mess?.displayName}
                    time={mess?.timestamp?.seconds}
                  ></UserItemChart>
                ) : (
                  <UserItemChart
                    isUser
                    key={mess?.id}
                    avatar={mess?.photoURL}
                    image={mess?.image}
                    text={parse(mess?.message)}
                    userName={mess?.displayName}
                    time={mess?.timestamp?.seconds}
                  ></UserItemChart>
                )
              )
            ) : (
              <LoadingSpiner />
            )}
          </div>

          <div className="relative">
            <div
              className={`quill-text   max-h-[150px] overflow-y-auto scrollbar-hide rounded-xl`}
            >
              <ReactQuill
                theme="snow"
                placeholder="Message..."
                value={valueMessage}
                onChange={(value) => handleUploadMess(value)}
              />
            </div>
            <div className="absolute py-2 px-3 right-5 bottom-2 bg-blue-600 text-white rounded-xl cursor-pointer flex gap-3 items-center">
              <span
                onClick={handleSubmitMessage}
                className="py-1 px-2 rounded-xl bg-blue-400"
              >
                {" "}
                <IconSend className="w-5 h-5"></IconSend>
              </span>
              <InputFileUploadImage
                valueImage={imageUrlFile}
                handlSelectImage={handleSelectImage}
              ></InputFileUploadImage>
            </div>

            {imageUrlFile && (
              <div className="group image-file absolute right-5 bottom-full py-5 px-8 rounded-2xl shadown-0-3">
                <img
                  className="w-[300px] h-[400px] rounded-xl object-cover"
                  src={imageUrlFile}
                  alt="img file"
                />
                <button
                  onClick={handleRemoveImageFile}
                  className="group-hover:opacity-100 group-hover:visible invisible opacity-0 bg-white text-red-500 p-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                >
                  <IconDelete></IconDelete>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`${
          showInforRoomChart ? "w-[360px] p-3 flex-shrink-0" : " w-0"
        } overflow-hidden `}
      >
        <div className=" text-white h-full py-5 px-2 rounded-lg flex flex-col">
          <div className="flex  items-center justify-center flex-col gap-5">
            <img
              className="w-[60px] h-[60px] rounded-full"
              src="https://images.unsplash.com/photo-1475483768296-61…ufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
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

export default WindownChat;
