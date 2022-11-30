import { useEffect, useMemo, useState } from "react";
import useFirestore from "./useFirestore";
import { firebase_collection } from "../common ";
import { where } from "firebase/firestore";
import { useAuthContext } from "../contexts/auth-context";

function useSearchUser(users, valueSearch, ...queryPropsUser) {
  const { userInfo } = useAuthContext();
  const [value, setValue] = useState("");

  const [listUser, setListUser] = useState(users);

  const userCondition = useMemo(() => {
    return {
      fieldName: "keywords",
      operator: "array-contains",
      compareValue: value,
    };
  }, [value]);

  const query = useMemo(() => {
    return where("uid", "!=", userInfo?.uid);
  }, [userInfo]);

  const user = useFirestore(
    firebase_collection.USERS,
    userCondition,
    query,
    ...queryPropsUser
  );

  useEffect(() => {
    const time = setTimeout(() => {
      setValue(valueSearch);
    }, 1000);

    return () => clearTimeout(time);
  }, [valueSearch]);

  useEffect(() => {
    if (user && value) {
      setListUser(user);
    } else {
      setListUser(users);
    }
  }, [user, value, users]);

  return listUser;
}

export default useSearchUser;
