import Image from "next/image";
import { FormEvent, useState, useEffect } from "react";
interface Body {
  photo?: string;
  headline?: string;
  description?: string;
}

interface Return {
  photo?: string;
  price?: number;
  description?: string;
}

interface Detail {
  targetAmount: number;
  closingDate: Date;
  prefectures: number;
  category: number;
}

interface SetDetail {
  description: string;
  photo: string;
  headline: string;
}

interface FormData {
  title: string;
  createdBy: string;
  body: Body[];
  detail: Detail;
  return: Return[];
}
export default function ProjectContents({
  index,
  photoChange,
  headlineChange,
  descChange,
}: {
  index: number;
  photoChange: (index: number, en: any) => void;
  headlineChange: (index: number, headline: string) => void;
  descChange: (index: number, description: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* <p className="hidden">{formDataList.title}</p> */}
      <label
        className="flex items-center justify-center rounded-3xl border-4 border-dashed border-[#FFBF91] w-full h-[357px]"
        htmlFor={`file-${index}`}
      >
        <input
          type="file"
          id={`file-${index}`}
          accept=".png, .jpeg, .jpg"
          onChange={(e) => photoChange(index, e)}
          placeholder="画像を選択"
          className="justify-center items-center hidden"
        />
        <span className="px-3 py-2 text-white text-lg bg-[#FFBF91] rounded-xl">
          画像アップロード
        </span>
      </label>
      <input
        type="text"
        onChange={(e) => headlineChange(index, e.target.value)}
        placeholder="見出しを入力してください"
        className="flex items-center px-8 w-full rounded-3xl border-4 border-dashed border-[#FFBF91] h-[58px] outline-none"
      />
      <label
        className="flex w-full items-start py-4 px-8 h-[291px] rounded-3xl border-4 border-dashed border-[#FFBF91]"
        htmlFor={`desc-${index}`}
      >
        <textarea
          name={`desc-${index}`}
          onChange={(e) => descChange(index, e.target.value)}
          placeholder="テキストを入力してください"
          className="w-full h-full outline-none resize-none"
        />
      </label>
    </div>
  );
}
