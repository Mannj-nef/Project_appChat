import React from "react";
import { firebase_collection } from "../common ";
import useFirestore from "../hooks/useFirestore";

const UsesPage = () => {
  const users = useFirestore(firebase_collection.USERS);

  console.log(users);
  return (
    <div className="grid grid-cols-4 gap-5">
      {!!users.length &&
        users.map((item) => (
          <div className="flex flex-col" key={item?.uid}>
            <img src={item?.photoURL} alt="avatar" />
            <p>{item.displayName}</p>
          </div>
        ))}
      <div className="flex flex-col">
        <img src="https://source.unsplash.com/random" alt="avatar" />
        <p>Name</p>
      </div>
      <div className="flex flex-col">
        <img src="https://source.unsplash.com/random" alt="avatar" />
        <p>Name</p>
      </div>
    </div>
  );
};

export default UsesPage;
