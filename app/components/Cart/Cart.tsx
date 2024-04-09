import Header from "../Header/Header";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/firebase/setup";
import { firestore, initializeFirebaseApp } from "@/app/firebase/setup";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  getDocFromCache,
  updateDoc,
} from "firebase/firestore";
import firebase from "firebase/compat/app";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

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
  photo?: string;
  headline: string;
}

initializeFirebaseApp();
export default function Cart({
  docId,
  alldata,
  returnIndex,
  difference,
  setShow,
  changeProject,
}: {
  docId: string;
  alldata: Data;
  returnIndex: number;
  difference: number;
  setShow: () => void;
  changeProject: () => void;
}) {
  const [login, setlogin] = useState<"active" | "inactive">("inactive");
  const [flag, setflag] = useState<true | false>(false);
  const handler = () => {
    setlogin("active");
    setflag(true);
  };

  const [data, setData] = useState([]);

  let parsent = (alldata.amountAchieved / alldata.targetAmount) * 100;
  parsent = Math.round(parsent);

  let maney = alldata.return[returnIndex].price + 220;

  const router = useRouter();

  // //購入処理
  const handleClick = async () => {
    let price = alldata?.return[returnIndex].price;
    let people = alldata.people;
    let totalpeople = people + 1;
    let total = alldata?.amountAchieved + price;
    const userRef = doc(firestore, "Projects", docId);
    await updateDoc(userRef, {
      amountAchieved: total,
      people: totalpeople,
    });
    const redirectUrl = `/${docId}`;
    //画面遷移
    setShow();
    changeProject();

    // redirect(redirectUrl);
  };

  //firebaseSotrageから画像取得
  const gsReference = ref(storage, `detail/${alldata.photo}`);
  getDownloadURL(gsReference).then((url) => {
    const img = document.getElementById(`myimg-${docId}`);
    img?.setAttribute("src", url);
  });

  const selectReturn = ref(
    storage,
    `return/${alldata.return[returnIndex].photo}`
  );
  getDownloadURL(selectReturn).then((url) => {
    const reimg = document.getElementById(`reimg-${returnIndex}`);
    reimg?.setAttribute("src", url);
  });

  return (
    <div>
      <div className="inline-flex flex-col justify-center items-start gap-4">
        <button className="text-[#FFBF91] font-bold text-xl ml-4 mt-8">
          ＜ 概要に戻る
        </button>
        <div className="inline-flex justify-center items-start">
          <div className="flex flex-col px-8 py-4 items-start gap-6">
            <p className="font-bold text-3xl text-[#7E7C7C] ml-4">
              選択中のリターン
            </p>
            <div className="flex flex-col px-8 py-4 items-start gap-6 rounded-3xl border border-solid border-[#FFBF91] bg-[#FFFCFC] w-[800px] h-[393px]">
              <div className="flex gap-1 items-center">
                <Image
                  src={"/Check.svg"}
                  width={44}
                  height={45}
                  alt="チェック"
                ></Image>
                <p className="font-bold text-3xl">
                  {alldata.return[returnIndex].price}円
                </p>
                <p className="text-2xl font-normal text-[#7E7C7C]">
                  {" "}
                  +システム料金
                </p>
              </div>
              <div className="flex flex-start gap-8">
                {/* ここ */}
                <Image
                  src={""}
                  width={370}
                  height={285}
                  id={`reimg-${returnIndex}`}
                  alt="チェック"
                  className="rounded-3xl w-[370px] h-[285px]"
                ></Image>
                <p className="font-bold text-base">
                  {alldata.return[returnIndex].description}
                </p>
              </div>
            </div>
            <div className="w-[800px] flex flex-col items-start gap-3 rounded-lg bg-[#D3D1D1] p-2">
              <div className="flex items-start gap-4">
                <Image
                  src={"/attention.svg"}
                  width={34}
                  height={29}
                  alt="注意"
                ></Image>
                <p className="text-[#434343] font-bold text-2xl">
                  システム料金について
                </p>
              </div>
              <p className="text-[#434343] font-bold text-xl">
                システム利用料は、1回のお支払いごとに220円（税込）頂戴いたします。
                複数のギフトを寄付する場合もお支払いごとに220円（税込）となります。
              </p>
            </div>
            <div className="flex flex-col justify-center items-center py-5">
              <div className="flex w-[800px] py-5 items-start justify-between">
                <p className="text-2xl font-normal">寄付金額</p>
                <p className="text-2xl font-normal">
                  {alldata.return[returnIndex].price}円
                </p>
              </div>
              <div className="flex w-[800px] py-5 items-start justify-between">
                <p className="text-2xl font-normal">システム料金</p>
                <p className="text-2xl font-normal">220円</p>
              </div>
              <div className="border w-[800px] border-[#000]"></div>
              <div className="flex w-[800px] py-5 items-start justify-between">
                <p className="font-bold text-3xl">合計金額</p>
                <p className="font-bold text-3xl">{maney}円</p>
              </div>
            </div>
            <button
              onClick={handleClick}
              className="flex flex-col justify-center items-center bg-[#FFBF91] rounded-3xl w-[800px] h-14 shadow-[0px 4px 4px 0px rgba(0, 0, 0, 0.25)]"
            >
              <p className="text-white flex items-center font-bold text-base">
                支援を確定する
              </p>
            </button>
          </div>
          <div className="flex flex-col justify-center items-center gap-8">
            <p className="text-[#7E7C7C] text-2xl font-bold">
              支援しているプロジェクト
            </p>
            <div className="flex flex-col py-4 px-8 items-start gap-4 border border-solid border-[#FFBF91] bg-[#FFFCFC] rounded-3xl">
              <Image
                src={""}
                width={305}
                height={151}
                id={`myimg-${docId}`}
                alt="バンド1"
                className="rounded-lg"
              ></Image>
              <p className="font-bold text-base">{alldata.title}</p>
              <div className="w-full bg-gray-200 rounded-3xl">
                <div className="bg-[#FFBF91] text-xs font-medium text-white text-center p-0.5 leading-none rounded-3xl w-[50%]">
                  {parsent}%
                </div>
              </div>
              <p className="text-[#7E7C7C] text-base front-bold">支援総額</p>
              <div className="flex items-center gap-4">
                <Image
                  src={"/money.svg"}
                  width={32}
                  height={45}
                  alt="支援総額"
                ></Image>
                <p className="font-bold text-2xl">{alldata.amountAchieved}円</p>
              </div>
              <div className="flex items-center justify-between gap-11">
                <div className="flex flex-col items-start gap-3">
                  <p className="text-[#7E7C7C] font-bold text-sm">支援者数</p>
                  <div className="flex items-start gap-5">
                    <Image
                      src={"/people.svg"}
                      width={30}
                      height={26}
                      alt="支援者数"
                    ></Image>
                    <p className="font-bold text-sm">{alldata.people}人</p>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center gap-3">
                  <p className="text-[#7E7C7C] font-bold text-sm">
                    募集終了までの残り
                  </p>
                  <div className="flex gap-5 justify-end items-center">
                    <Image
                      src={"/timer2.svg"}
                      width={27}
                      height={30}
                      alt="時間"
                    ></Image>
                    <p className="font-bold text-sm">{difference}日</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 py-4 px-8">
              <div className="flex items-center gap-2">
                <Image
                  src={"/Read.svg"}
                  width={24}
                  height={24}
                  alt="時間"
                ></Image>
                <p className="text-[#7E7C7C] font-bold text-base">
                  お読みください
                </p>
              </div>
              <p className="text-base font-normal">
                支援額とリターンの内容をご確認ください。支援完了後はキャンセルおよび変更ができませんのでご注意ください。
                <br />
                <br />
                目標到達に関わらず、プロジェクト支援を行った時点で支援金の決済が行われます。
                <br />
                <br />
                CAMPFIREはプロジェクトオーナーの能力やプロジェクトの実行を保証するものではありません。プロジェクトの実行やリターンの発送（履行）などは、全てプロジェクトオーナーの責任のもと行われます。
                <br />
                <br />
                支援に関するよくある質問はこちらからご覧いただけます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
