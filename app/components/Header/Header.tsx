import Image from "next/image";
import { LoginProps } from "@/app/types/types";
import React from "react";
export default function Header({
  flag,
  // onclick,
  changeTab,
}: {
  flag: boolean;
  // onclick?: React.MouseEventHandler;
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
  return (
    <>
      {flag ? (
        <header className="flex flex-row justify-between pt-5 pl-4">
          <Image
            src="/goraku.svg"
            width={164}
            height={100}
            alt="ヘッダーロゴ"
            className="w-[174px] h-[80px]"
          />
          <nav className="m-4">
            <ul className="flex gap-4 text-[#FFBF91] font-bold">
              <li onClick={() => changeTab("Home")}>HOME</li>
              {/* <li className="hover:"> */}
              {/* Project
                <ul>
                  <li onClick={() => changeTab("ProjectCreate")}>Create</li>
                  <li onClick={() => changeTab("ProjectSearch")}>Search</li>
                </ul>
              </li> */}
              <li onClick={() => changeTab("ProjectCreate")}>Create</li>
              <li onClick={() => changeTab("ProjectSearch")}>Search</li>
              {/* <li onClick={() => changeTab("Cart")}>Cart</li> */}
              <li onClick={() => changeTab("Chat")}>Chat</li>
            </ul>
          </nav>
        </header>
      ) : (
        <header className="flex flex-row justify-between pt-5 pl-4">
          <Image src="/1.png" width={164} height={66} alt="ヘッダーロゴ" />
          <div className="flex flex-row">
            <button
              onClick={onclick}
              className="bg-[#FFBF91] text-white rounded px-4 py-2 text-bold"
            >
              ログイン・新規登録
            </button>
            <div className="flex flex-row ml-4">
              <Image src="/search.svg" width={20} height={20} alt="検索" />
              <input
                type="text"
                className="ml-2 w-40 outline-none"
                placeholder="キーワード検索"
              ></input>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
