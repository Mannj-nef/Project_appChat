import { collection, doc, setDoc } from "firebase/firestore";
import { firebase_collection } from "../common ";
import { db } from "./firebase-config";

const colRefUser = collection(db, firebase_collection.USERS);

export const setDocById = async (collection, id, data) => {
  const docRef = doc(db, collection, id);
  await setDoc(docRef, data);
};
