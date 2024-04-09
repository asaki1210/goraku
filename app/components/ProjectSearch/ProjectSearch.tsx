import Header from "../Header/Header";
import { useState, useEffect } from "react";
import Image from "next/image";
import ProjectTable from "../Home/ProjectTable";
import Attention from "../Home/Attention";
import { area, category } from "../../lib/select";
export default function ProjectSearch() {
  const [login, setlogin] = useState<"active" | "inactive">("inactive");
  const [flag, setflag] = useState<true | false>(false);
  const handler = () => {
    setlogin("active");
    setflag(true);
  };
  return (
    <div>
      <form className="flex w-full gap-6 items-center content-center justify-center px-4 mt-10">
        <div className="flex items-center gap-4 w-[28%]">
          <Image
            src={"/category.svg"}
            width={51}
            height={54}
            alt="カテゴリー"
          ></Image>
          <button className="flex inline-block w-full items-center content-center border-4 border-dashed border-[#FFBF91] rounded-3xl outline-none h-10 p-4 text-[#9CA3AF]">
            <div>カテゴリーを選択してください</div>
          </button>
        </div>
        <div className="flex items-center gap-4 w-[28%]">
          <Image
            src={"/Location.svg"}
            width={51}
            height={54}
            alt="場所"
          ></Image>
          <button className="flex inline-block w-full items-center content-center border-4 border-dashed border-[#FFBF91] rounded-3xl outline-none h-10 p-4 text-[#9CA3AF]">
            <div>場所を選択してください</div>
          </button>
        </div>
        <div className="flex items-center gap-4 w-[28%]">
          <div className="flex gap-3 items-center content-center w-full">
            <Image
              src={"/timer2.svg"}
              width={51}
              height={54}
              alt="募集期間"
            ></Image>
            <input
              type="date"
              className="inline-block border-4 border-dashed border-[#FFBF91] rounded-3xl outline-none h-10 p-4 text-[#9CA3AF] w-full"
            />
          </div>
        </div>
      </form>
      <div className="w-full text-[#FFBF91] font-bold text-2xl ml-8 mt-8">
        プロジェクトリスト
      </div>
      {/* プロジェクトリスト */}
      <div className="w-full flex items-center justify-center gap-6">
        <button className="flex bg-[#FFBF91] text-white p-6 justify-center items-center font-bold text-base w-[20px] h-[20px] rounded-lg">
          1
        </button>
        <button className="flex bg-[#FFBF91] text-white p-6 justify-center items-center font-bold text-base w-[20px] h-[20px] rounded-lg">
          2
        </button>
        <button className="flex bg-[#FFBF91] text-white p-6 justify-center items-center font-bold text-base w-[20px] h-[20px] rounded-lg">
          3
        </button>
        <button className="flex bg-[#FFBF91] text-white p-6 justify-center items-center font-bold text-base w-[20px] h-[20px] rounded-lg">
          ＞
        </button>
      </div>
    </div>
  );
}
