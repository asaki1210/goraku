"use client";
import Header from "../Header/Header";
import ChatMessage from "./ChatMessage";
import Chatside from "./Chatside";
import { useState, useEffect } from "react";

interface Data {
  people: number;
  amountAchieved: number;
  targetAmount: number;
  return: Return[];
  detail: Detail[];
  documentId: string;
  createdDate: Date;
  photo: string;
  deleteDate?: Date;
  createdBy: string;
  prefectures: number;
  category: number;
  title: string;
  updatedDate: Date;
  closingDate: Date;
}

interface Return {
  photo: string;
  price: number;
  description: string;
}

interface Detail {
  description: string;
  photo: string;
  headline: string;
}

interface UserData {
  email: string;
  password: string;
  userid: string;
  username: string;
}

export default function Chat({
  data,
  flag,
  onclick,
  ChangeTab,
  id,
}: {
  data: Array<Data>;
  flag: boolean;
  onclick?: React.MouseEventHandler;
  ChangeTab: (
    nav:
      | "Home"
      | "Chat"
      | "Cart"
      | "ProjectCreate"
      | "ProjectSearch"
      | "ProjectPage"
  ) => void;
  id: string;
}) {
  //プロジェクトタイトル
  const [projectlist, setProjectList] = useState<Array<string>>([]);
  //プロジェクトのドキュメントid
  const [projectsid, setProjectid] = useState<Array<string>>([]);
  //ユーザーネーム取得
  const [username, setName] = useState([""]);
  //プロジェクト切り替え
  const [changeside, setSide] = useState<string>(projectsid[0]);
  const [projecttitle, setTitle] = useState<string>(projectlist[0]);

  function ChangeMessage(change: string) {
    setSide(change);
    data.map((d, i) => {
      if (d.documentId === change) {
        setTitle(d.title);
      }
    });
  }

  useEffect(() => {
    console.log("changeTitle");

    console.log(projecttitle);
  }, [projecttitle]);

  useEffect(() => {
    //プロジェクト制作者とuseridが一致するプロジェクトタイトルとプロジェクトid取得
    const projecttitle: Array<string> = [];
    const projectid: Array<string> = [];
    data.map((d, i) => {
      if (d.createdBy === id) {
        projecttitle.push(d.title);
        projectid.push(d.documentId);
      }
    });
    setProjectList(projecttitle);
    setProjectid(projectid);
  }, []);

  return (
    <>
      <div className="w-full h-screen flex flex-row">
        <Chatside
          projectlist={projectlist}
          projectsid={projectsid}
          changeMessage={ChangeMessage}
        />
        <div className="w-full h-full px-[2%] flex flex-col">
          <Header flag={flag} onclick={onclick} changeTab={ChangeTab} />
          <ChatMessage chageside={changeside} projecttitle={projecttitle} />
        </div>
      </div>
    </>
  );
}
