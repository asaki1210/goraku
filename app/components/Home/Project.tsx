import Image from "next/image";
import { Timestamp } from "firebase/firestore";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ref, getDownloadURL } from "firebase/storage";
import {
  initializeFirebaseApp,
  firestore,
  storage,
} from "@/app/firebase/setup";
import { url } from "inspector";

interface Data {
  people: number;
  amountAchieved: number;
  targetAmount: number;
  return: Return[];
  detail: Detail[];
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
  price: string;
  description: string;
}

interface Detail {
  description: string;
  photo: string;
  headline: string;
}
export default function Project({
  //引数
  title,
  targetAmount,
  people,
  photo,
  docId,
  amountAchieved,
  closingDate,
  id,
}: //   target,
{
  //型宣言
  title: string;
  targetAmount: number;
  people: number;
  photo: string;
  docId: string;
  amountAchieved: number;
  closingDate: Date;
  id: string;
  //   target: number;
}) {
  const query = {
    userid: id,
    projectpage: "ProjectPage",
  };
  //進捗率計算
  let parsent = (amountAchieved / targetAmount) * 100;
  parsent = Math.round(parsent);

  const parsentstring = "w-[" + parsent + "%]";
  const [img, setImg] = useState<string>("");

  //firebaseSotrageから画像取得
  const gsReference = ref(storage, `detail/${photo}`);
  getDownloadURL(gsReference).then((url) => {
    const img = document.getElementById(`myimg-${docId}`);
    img?.setAttribute("src", url);
  });

  //日付計算
  function timestampToDate(timestamp: any) {
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
  const date = timestampToDate(closingDate);
  //現在日付取得
  const now = new Date();
  // 指定した日付を計算用のデータ形式に変換
  const then = new Date(date);
  // 差を計算する
  const difference = Math.floor((then - now) / (1000 * 60 * 60 * 24));

  return (
    // <Link href={`/${docId}`}>
    <Link href={{ pathname: `/${docId}`, query: query }}>
      <div className="inline-flex items-start rounded-3xl border-[#FFBF91] border-solid border bg-[#FFFCFC] shadow-[0px 4px 4px 0px rgba(0, 0, 0, 0.25)] relative overflow-hidden w-[100%]">
        <Image
          src={""}
          width={169}
          height={134}
          alt="プロジェクト画像"
          id={`myimg-${docId}`}
          className="w-[169px] h-[169px]"
        ></Image>
        <div className="bg-[#FFBF91] flex py-1 px-[30px] items-center rotate-[-45deg] absolute left-[-35px] top-[10px]">
          <Image
            src={"/Timer.svg"}
            width={24}
            height={54}
            alt="プロジェクト画像"
          ></Image>
          <p className="text-white font-bold text-xs">{difference + 1}日</p>
        </div>
        <div className="flex py-4 px-6 flex-col items-start gap-3">
          <p className="font-bold text-sm">{title}</p>
          <div className="w-full bg-gray-200 rounded-3xl">
            <div className="bg-[#FFBF91] text-xs font-medium text-white text-center p-0.5 leading-none rounded-3xl ${parsentstring}">
              {parsent}%
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Image
              src={"/people.svg"}
              width={24}
              height={54}
              alt="プロジェクト画像"
            ></Image>
            <p className="font-bold ">{people}人</p>
          </div>
          <div className="flex items-center gap-4">
            <Image
              src={"/money.svg"}
              width={24}
              height={54}
              alt="プロジェクト画像"
            ></Image>
            <p className="font-bold ">{amountAchieved}円</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
