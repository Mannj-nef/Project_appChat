import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";

const useFirestore = (firebaseCollection, condition, ...propsQuery) => {
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
          where(
            condition?.fieldName,
            condition?.operator,
            condition?.compareValue
          ),
          ...propsQuery
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseCollection, condition]);

  return documents;
};

export default useFirestore;
