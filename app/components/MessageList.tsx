import { log } from "console";
import { MessageListProps } from "../types/types";
import Image from "next/image";
export default function MessageList(props: MessageListProps) {
  const message = props.message;
  const flag = props.flag;

  return (
    <>
      {flag ? (
        //相手
        <div className="flex items-center self-stretch gap-2">
          <Image
            src={"/Account_icon.svg"}
            width={39}
            height={39}
            alt="アカウント"
          ></Image>
          <div className="flex px-3 items-center rounded-3xl bg-[#EFECEC] shadow-xl">
            <p className="text-base font-normal">{message}</p>
          </div>
        </div>
      ) : (
        // 自分
        <div className="flex justify-end items-center self-stretch shrink-0">
          <div className="flex px-3 justify-end items-center rounded-3xl shadow-xl bg-[#FFD5B7]">
            <p className="text-base font-normal">{message}</p>
          </div>
        </div>
      )}
    </>
  );
}
