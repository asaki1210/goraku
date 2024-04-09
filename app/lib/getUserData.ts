"use client";
import { firestore, initializeFirebaseApp } from "@/app/firebase/setup";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

initializeFirebaseApp();

export const getUsers = async () => {
  const querySnapshot = await getDocs(collection(firestore, "Account"));
  const accountData: any = [];
  var data = {};
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    data = { ...doc.data(), documentId: doc.id };

    accountData.push(data);
  });

  return accountData;
};
