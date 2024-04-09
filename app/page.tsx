"use client";
import Chat from "./components/Chat/Chat";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import ProjectPage from "./components/ProjectPage/ProjectPage";
import Header from "./components/Header/Header";
import ProjectCreate from "./components/ProjectCreate/ProjectCreate";
import ProjectSearch from "./components/ProjectSearch/ProjectSearch";
import Login from "./components/Login/Login";
import { getProjects } from "./lib/getProjectData";
import { useState, useEffect } from "react";
import { firestore, initializeFirebaseApp } from "@/app/firebase/setup";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/app/firebase/setup";
export default function Page() {
  const [tab, setTab] = useState<
    | "Home"
    | "Chat"
    | "Cart"
    | "ProjectCreate"
    | "ProjectSearch"
    | "ProjectPage"
    | "Login"
  >("Login");
  const [login, setlogin] = useState<"active" | "inactive">("inactive");
  const [flag, setflag] = useState<boolean>(true);
  const [data, setData] = useState([]);
  const [userid, setId] = useState<string>("");

  useEffect(() => {
    // let result = getProjects();
    //プロジェクトデータ取得

    const querydata: any = collection(firestore, "Projects");
    return onSnapshot(
      querydata,
      (querySnapshot: any) => {
        const allData: any = [];
        var data = {};
        querySnapshot.forEach((doc: any) => {
          data = { ...doc.data(), documentId: doc.id };
          allData.push(data);
          setData(allData);
          console.log(allData);
        });
      },
      (err: any) => {
        console.log(`Encountered error: ${err}`);
      }
    );
    // result.then((r) => setData(r));
  }, []);

  const handler = () => {
    setlogin("active");
    // setflag(true);
  };

  const changecreate = () => {
    setTab("Chat");
  };
  function ChangeTab(
    nav:
      | "Home"
      | "Chat"
      | "Cart"
      | "ProjectCreate"
      | "ProjectSearch"
      | "ProjectPage"
      | "Login"
  ) {
    setTab(nav);
  }

  return (
    <>
      {tab == "Chat" ? (
        <Chat
          flag={flag}
          onclick={handler}
          ChangeTab={ChangeTab}
          id={userid}
          data={data}
        />
      ) : tab == "Login" ? (
        <Login changeTab={ChangeTab} changeId={(id: string) => setId(id)} />
      ) : (
        <>
          <Header flag={flag} changeTab={ChangeTab} />
          {tab == "Home" ? (
            <Home data={data} id={userid} changeTab={ChangeTab} />
          ) : tab == "ProjectCreate" ? (
            <ProjectCreate id={userid} changecreate={changecreate} />
          ) : tab == "ProjectSearch" ? (
            <ProjectSearch />
          ) : (
            tab == "Cart" && <Cart />
          )}
        </>
      )}
    </>
  );
}
