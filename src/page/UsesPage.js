import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { firebase_collection, router_link, TOAST_TYPE } from "../common ";
import Button from "../components/button/Button";
import LoadingSpiner from "../components/loading";
import { useAuthContext } from "../contexts/auth-context";
import { db } from "../firebase/firebase-config";
import useFirestore from "../hooks/useFirestore";
import useLoading from "../hooks/useLoading";

const UsesPage = () => {
  const { userInfo } = useAuthContext();
  const navigate = useNavigate();
  const usersCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "!=",
      compareValue: userInfo?.uid,
    };
  }, [userInfo?.uid]);

  const users = useFirestore(firebase_collection.USERS, usersCondition);
  const { isLoading: loadingUsers } = useLoading(users);

  const handleCreateRoomChat = async (user) => {
    const colRef = collection(db, firebase_collection.ROOMS);

    const data = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      timestamp: serverTimestamp(),
      admins: [userInfo?.uid],
      members: [user.uid, userInfo?.uid],
    };
    try {
      console.log(data);
      await addDoc(colRef, data);
      toast.success("success", TOAST_TYPE);
      navigate(router_link.MESSAGES);
    } catch (error) {
      toast.success(error.message, TOAST_TYPE);
    }
  };
  return (
    <div className="flex-1 p-20 min-h-[300px]">
      <div
        className={`${
          !loadingUsers ? "grid grid-cols-4" : ""
        }  gap-5 rounded-2xl bg-white p-5 opacity-90 shadown-25 max-h-[770px] overflow-auto scrollbar-hide`}
      >
        {!loadingUsers ? (
          !!users.length &&
          users.map((item) => (
            <div
              className="flex flex-col items-center justify-center gap-5 border rounded-md p-3 shadow-md bg-white"
              key={item?.uid}
            >
              <img
                className="w-[100px] h-[100px] object-cover rounded-full"
                src={item?.photoURL}
                alt="avatar"
              />
              <p>{item.displayName}</p>
              <Button
                className="w-fit flex"
                handle={() => handleCreateRoomChat(item)}
              >
                Send Message
              </Button>
            </div>
          ))
        ) : (
          <LoadingSpiner className="  border-blue-600" />
        )}
      </div>
    </div>
  );
};

export default UsesPage;
