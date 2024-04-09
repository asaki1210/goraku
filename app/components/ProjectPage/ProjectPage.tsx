import ReturnChoose from "./ReturnChoose";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Attention from "../Home/Attention";
import Project from "../Home/Project";
import { area, category } from "../../lib/select";
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
  price: string;
  description: string;
}

interface Detail {
  description: string;
  photo?: string;
  headline: string;
}

export default function ProjectPage({
  data,
  alldata,
  changeTab,
  docId,
  changeShow,
  difference,
}: {
  data: Array<Data>;
  alldata: Data;
  docId: string;
  difference: number;
  changeTab?: (
    nav:
      | "Home"
      | "Chat"
      | "Cart"
      | "ProjectCreate"
      | "ProjectSearch"
      | "ProjectPage"
  ) => void;
  changeShow: () => void;
}) {
  const [show, setShow] = useState<boolean>(false);
  setTimeout(() => setShow(true), 2000);

  //地域
  const [address, setAddress] = useState<string>("");
  //カテゴリー
  const [cate, setCate] = useState<string>("");

  useEffect(() => {
    if (alldata) {
      setAddress(area[alldata.prefectures]);
      setCate(category[alldata.category]);
    }
    setImg([]);
    setreImg([]);
    getImages();
    returnImages();
  }, [alldata?.prefectures, alldata?.category]);

  //進捗率
  let parsent = (alldata?.amountAchieved / alldata?.targetAmount) * 100;
  parsent = Math.round(parsent);

  // const [img, setImg] = useState<string[]>([]);
  const [img, setImg] = useState<Array<string | undefined>>([]);
  const [reimg, setreImg] = useState<Array<string | undefined>>([]);

  //firebaseSotrageから画像取得
  //detail
  async function getImages() {
    var data: Array<string> = [];
    alldata?.detail.map(async (d) => {
      if (d.photo) {
        const gsReference = ref(storage, `detail/${d.photo}`);
        await getDownloadURL(gsReference).then((url: string) => {
          data.push(url);
        });
      }
    });
    setImg(data);
  }

  //return
  async function returnImages() {
    var data: Array<string> = [];
    alldata?.return.map(async (r) => {
      if (r.photo) {
        const gsReference = ref(storage, `return/${r.photo}`);
        await getDownloadURL(gsReference).then((url: string) => {
          data.push(url);
        });
      }
    });
    setreImg(data);
  }

  //detail
  function Images(i: number) {
    if (img[i]) {
      return img[i] || "";
    } else {
      return "";
    }
  }

  function reImages(i: number) {
    if (reimg[i]) {
      return reimg[i] || "";
    } else {
      return "";
    }
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-8">
        <p className="font-bold text-3xl">{alldata?.title}</p>
      </div>
      <div className="mt-8 inline-flex gap-8 items-start content-center mx-16">
        <div className="flex flex-col items-start gap-8 justify-center">
          {alldata?.detail &&
            alldata?.detail.map((d, i) => (
              <React.Fragment key={i}>
                {d.photo && (
                  <Image
                    src={Images(i)}
                    width={722}
                    height={357}
                    alt="詳細画像"
                    className="rounded-lg"
                  ></Image>
                )}
                <div className="flex flex-col items-start gap-8 justify-center w-[719px]">
                  <div className=" flex border-l-4 border-solid border-[#FFBF91]">
                    <p className="font-bold text-2xl ml-4">{d.headline}</p>
                  </div>
                  <p className="font-normal text-base">{d.description}</p>
                </div>
              </React.Fragment>
            ))}
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col rounded-3xl border border-solid border-[#FFBF91] bg-[#FFFCFC] items-start gap-2 w-[376px] p-4">
            <p className="text-[#7E7C7C] text-xl font-bold">支援総額</p>
            <div className="flex items-center content-center gap-3">
              <Image
                src={"/money.svg"}
                width={53}
                height={56}
                alt="お金イラスト"
              ></Image>
              <p className="font-bold text-4xl">{alldata?.amountAchieved}円</p>
            </div>
            <div className="rounded-3xl bg-[#FFBF91] w-full pl-3 text-white">
              {parsent}%
            </div>
            <div className="text-[#7E7C7C] font-bold text-sm flex gap-4">
              <p>目標金額</p>
              <p>{alldata?.targetAmount}円</p>
            </div>
            <div className="flex gap-12">
              <div className="flex-col">
                <p className="text-[#7E7C7C] text-base font-bold">支援者数</p>
                <div className="flex gap-4">
                  <Image
                    src={"/people.svg"}
                    width={25}
                    height={24}
                    alt="人数イラスト"
                  ></Image>
                  <p className="font-bold text-3xl">{alldata?.people}人</p>
                </div>
              </div>
              <div className="flex-col">
                <p className="text-[#7E7C7C] text-base font-bold">開催地域</p>
                <div className="flex gap-4">
                  <Image
                    src={"/Location.svg"}
                    width={25}
                    height={24}
                    alt="地域"
                  ></Image>
                  <p className="font-bold text-3xl">{address}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-12">
              <div className="flex-col">
                <p className="text-[#7E7C7C] text-base font-bold">カテゴリー</p>
                <div className="flex gap-4">
                  <Image
                    src={"/category.svg"}
                    width={25}
                    height={24}
                    alt="カテゴリー"
                  ></Image>
                  <p className="font-bold text-3xl">{cate}</p>
                </div>
              </div>
              <div className="flex-col">
                <p className="text-[#7E7C7C] text-base font-bold">
                  募集終了までの残り
                </p>
                <div className="flex gap-4">
                  <Image
                    src={"/timer2.svg"}
                    width={25}
                    height={24}
                    alt="時間イラスト"
                  ></Image>
                  <p className="font-bold text-3xl">{difference + 1}日</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-start content-start gap-5">
            <div className="flex gap-3 items-center content-center">
              <Image
                src={"/Gift.svg"}
                width={57}
                height={69}
                alt="リターンイラスト"
              ></Image>
              <p className="text-[#FFBF91] font-bold text-4xl">リターン</p>
            </div>
            {alldata?.return &&
              alldata?.return.map((r, i) => (
                <ReturnChoose
                  photo={reImages(i)}
                  price={r.price}
                  description={r.description}
                  docId={docId}
                  index={i}
                  changeShow={changeShow}
                  key={i}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="border border-[#FFBF91] border-solid ml-8 mr-14 mt-10 flex-shrink"></div>
      <Attention />
      <div className="flex p-6 items-center content-center gap-8 flex-wrap w-full">
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
                key={i}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
