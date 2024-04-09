import { firestore, initializeFirebaseApp } from "@/app/firebase/setup";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "@/app/firebase/setup";

initializeFirebaseApp();

export const getProjects = async () => {
  const querySnapshot = await getDocs(collection(firestore, "Projects"));
  const allData: any = [];
  var data = {};
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data = { ...doc.data(), documentId: doc.id };
    allData.push(data);
  });
  return allData;
};
