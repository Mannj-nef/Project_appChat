import React, { useMemo } from "react";
import { firebase_collection } from "../common ";
import Button from "../components/button/Button";
import { useAuthContext } from "../contexts/auth-context";
import useFirestore from "../hooks/useFirestore";

const UsesPage = () => {
  const { userInfo } = useAuthContext();
  const usersCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "!=",
      compareValue: userInfo?.uid,
    };
  }, [userInfo?.uid]);

  const users = useFirestore(firebase_collection.USERS, usersCondition);
  return (
    <div className="flex-1 p-20 min-h-[300px]">
      <div className="grid grid-cols-4 gap-5 rounded-2xl bg-white p-5 opacity-90 shadown-25 max-h-[770px] overflow-auto scrollbar-hide">
        {!!users.length &&
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
              <Button className="w-fit flex">Send Message</Button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UsesPage;
