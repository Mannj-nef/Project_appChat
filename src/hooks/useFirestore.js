import { onSnapshot, collection, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";

const useFirestore = (firebaseCollection, condition) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, firebaseCollection);
    if (
      condition &&
      (!condition.compareValue || !condition.compareValue.length)
    ) {
      return;
    }
    const collectionQuery = condition
      ? query(
          collectionRef,
          where(condition.fieldName, condition.operator, condition.compareValue)
        )
      : collectionRef;

    const unsubscribe = onSnapshot(collectionQuery, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(documents);
    });

    return unsubscribe;
  }, [firebaseCollection, condition]);

  return documents;
};

export default useFirestore;
