import { useState, useEffect } from "react";
import Attention from "./Attention";
import Project from "./Project";

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

export default function Home({
  data,
  id,
  changeTab,
}: {
  data: Array<Data>;
  id: string;
  flag: boolean;
  onclick?: React.MouseEventHandler;
  changeTab: (
    nav:
      | "Home"
      | "Chat"
      | "Cart"
      | "ProjectCreate"
      | "ProjectSearch"
      | "ProjectPage"
  ) => void;
}) {
  const [show, setShow] = useState<boolean>(false);
  setTimeout(() => setShow(true), 2000);

  return (
    <div className="gap-8 w-full">
      <div className="bg-[#FFBF91] h-72  flex flex-col justify-center items-center gap-20 mt-4">
        <p className="text-white text-4xl font-bold">
          あなたの見たいを叶えよう
        </p>
        <div className="flex justify-center items-center gap-36">
          <button
            className="bg-white text-[#FFBF91] w-60 h-14 rounded-3xl"
            onClick={() => changeTab("ProjectCreate")}
          >
            プロジェクトを始める
          </button>
          <button
            className="bg-white text-[#FFBF91] w-60 h-14 rounded-3xl"
            onClick={() => changeTab("ProjectSearch")}
          >
            プロジェクトを探す
          </button>
        </div>
      </div>
      <Attention />
      {/* プロジェクトテーブル */}
      <div className="flex p-6 items-center content-center gap-6 flex-wrap w-full">
        {show && (
          <>
            {data.map((d, i) => (
              <Project
                title={d.title}
                targetAmount={d.targetAmount}
                people={d.people}
                photo={d.photo}
                docId={d.documentId}
                amountAchieved={d.amountAchieved}
                closingDate={d.closingDate}
                id={id}
                key={i}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
