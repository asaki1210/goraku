"use client";
import { getProjects } from "@/app/lib/getProjectData";
import { redirect } from "next/navigation";
import { useState, useEffect, use } from "react";
import ProjectPage from "../components/ProjectPage/ProjectPage";
import { useSearchParams } from "next/navigation";
import ProjectCreate from "../components/ProjectCreate/ProjectCreate";
import Cart from "../components/Cart/Cart";
import Home from "../components/Home/Home";
import ProjectSearch from "../components/ProjectSearch/ProjectSearch";
import Login from "../components/Login/Login";
import Chat from "../components/Chat/Chat";
import { useRouter } from "next/navigation";
import Header from "../components/Header/Header";
import { Timestamp } from "firebase/firestore";
import { Data } from "../types/types";
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

export default function Page({ params }: { params: { id: string } }) {
  const [tab, setTab] = useState<
    | "Home"
    | "Chat"
    | "Cart"
    | "ProjectCreate"
    | "ProjectSearch"
    | "ProjectPage"
    | "Login"
  >("Home");
  const [login, setlogin] = useState<"active" | "inactive">("inactive");
  const [flag, setflag] = useState<boolean>(true);
  const id = params.id;
  const [allData, setAllData] = useState<Data>();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [docId, setDocId] = useState<string>("");
  const searchParams = useSearchParams();
  const [show, setShow] = useState(true);
  const [returnIndex, setreturnIndex] = useState(0);
  const [userid, setUserid] = useState("");
  const router = useRouter();

  const handler = () => {
    setlogin("active");
    // setflag(true);
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

  useEffect(() => {
    const urluserid = searchParams.get("userid");
    const projectpage = searchParams.get("projectpage");
    setTab(projectpage);

    setUserid(urluserid);
    const allData: any[] = [];

    const querydata: any = collection(firestore, "Projects");

    return onSnapshot(
      querydata,
      (querySnapshot: any) => {
        allData.length = 0; // allData を初期化

        querySnapshot.forEach((doc: any) => {
          const dataarray = { ...doc.data(), documentId: doc.id };
          allData.push(dataarray);
        });

        setData(allData);

        allData.forEach((g: Data) => {
          if (g.documentId == id) {
            setDocId(params.id);
            setAllData(g);
          }
        });

        setIsLoading(false);
      },
      (err: any) => {
        console.log(`Encountered error: ${err}`);
      }
    );
  }, []);

  const changeShow = (index: number) => {
    setreturnIndex(index);
    const returnParams = searchParams.get("return");
    if (String(returnParams).length != 0) {
      setTab("Cart");
    }
  };

  const changeProject = () => {
    setTab("ProjectPage");
  };

  const changecreate = () => {
    setTab("Chat");
  };

  // //日付計算
  function timestampToDate(timestamp?: Timestamp) {
    // timestamp 変数が undefined ではないことを確認する
    if (timestamp === undefined) {
      console.error("timestamp 変数が undefined です");
      return;
    }

    // timestamp 変数が null ではないことを確認する
    if (timestamp === null) {
      console.error("timestamp 変数が null です");
      return;
    }

    // timestamp 変数がオブジェクトであることを確認する
    if (typeof timestamp !== "object") {
      console.error("timestamp 変数がオブジェクトではありません");
      return;
    }

    // timestamp 変数が seconds プロパティを持っていることを確認する
    if (!timestamp.hasOwnProperty("seconds")) {
      console.error("timestamp 変数が seconds プロパティを持っていません");
      return;
    }
    const seconds = timestamp.seconds;
    const nanoseconds = timestamp.nanoseconds;
    const milliseconds = nanoseconds / 1000000;
    const date = new Date(seconds * 1000 + milliseconds);
    return date;
  }
  const date = timestampToDate(allData?.closingDate);
  //現在日付取得
  const now: Date = new Date();
  // 指定した日付を計算用のデータ形式に変換
  var then: Date;
  var difference: number = 0;
  if (date) {
    then = new Date(date);
    // 差を計算する
    difference = Math.floor(
      (then.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
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
      ) : (
        <>
          <Header flag={flag} changeTab={ChangeTab} />
          {tab == "Home" ? (
            <Home data={data} id={userid} changeTab={ChangeTab} />
          ) : tab == "ProjectCreate" ? (
            <ProjectCreate id={userid} changecreate={changecreate} />
          ) : tab == "ProjectSearch" ? (
            <ProjectSearch />
          ) : tab == "Cart" ? (
            <Cart
              docId={id}
              alldata={allData}
              returnIndex={returnIndex}
              difference={difference}
              setShow={() => setShow(true)}
              changeProject={changeProject}
            />
          ) : tab == "ProjectPage" ? (
            <ProjectPage
              data={data}
              alldata={allData}
              docId={id}
              show={show}
              changeShow={changeShow}
              difference={difference}
            />
          ) : (
            <Home data={data} id={userid} />
          )}
        </>
      )}
    </>
  );

  // if (isLoading) {
  //   return <h1>loading...</h1>;
  // } else if (!show) {
  //   return (
  //     <>
  //       <Header flag={flag} changeTab={ChangeTab} />;
  //       <Cart
  //         docId={id}
  //         alldata={allData}
  //         returnIndex={returnIndex}
  //         difference={difference}
  //         setShow={() => setShow(true)}
  //       />
  //       ;
  //     </>
  //   );
  // } else if (allData?.documentId.length != 0) {
  //   return (
  //     <>
  //       <Header flag={flag} changeTab={ChangeTab} />;
  //       <ProjectPage
  //         data={data}
  //         alldata={allData}
  //         docId={id}
  //         show={show}
  //         changeShow={changeShow}
  //         difference={difference}
  //       />
  //     </>
  //   );
  // } else if (tab) {
  //   console.log("tab");
  //   return (
  //     <>
  //       {tab == "Chat" ? (
  //         <Chat
  //           flag={flag}
  //           onclick={handler}
  //           ChangeTab={ChangeTab}
  //           id={userid}
  //           data={data}
  //         />
  //       ) : (
  //         <>
  //           <Header flag={flag} changeTab={ChangeTab} />
  //           {tab == "Home" ? (
  //             <Home data={data} />
  //           ) : tab == "ProjectCreate" ? (
  //             <ProjectCreate id={userid} />
  //           ) : tab == "ProjectSearch" ? (
  //             <ProjectSearch />
  //           ) : (
  //             tab == "Cart" && <Cart />
  //           )}
  //         </>
  //       )}
  //     </>
  //   );
  // } else {
  //   redirect("/");
  // }
}
