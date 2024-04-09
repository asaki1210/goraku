import Image from "next/image";
import { FormEvent, useState, useEffect } from "react";
import { getDatabase, onChildAdded, push, ref } from "@firebase/database";
import { FirebaseError } from "@firebase/util";

type MessageProps = {
  message: string;
};

const Message = ({ message }: MessageProps) => {
  return (
    <div className="flex justify-end items-center self-stretch shrink-0">
      <div className="flex px-3 justify-end items-center rounded-3xl shadow-xl bg-[#FFD5B7]">
        <p className="text-base font-normal">{message}</p>
      </div>
    </div>
  );
};

export default function ChatMessage(props: {
  chageside: string;
  projecttitle: string;
}) {
  const [message, setMessage] = useState<string>("");
  const [chats, setChats] = useState<MessageProps[]>([]);

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //メッセージ送信
    try {
      const db = getDatabase();
      const dbRef = ref(db, props.chageside);
      await push(dbRef, {
        message,
      });
      setMessage("");
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    //メッセージ取得
    try {
      setChats([]);
      const db = getDatabase();
      const dbRef = ref(db, props.chageside);
      return onChildAdded(dbRef, (snapshot) => {
        const message = String(snapshot.val()["message"] ?? "");
        setChats((prev) => [...prev, { message }]);
      });
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error(e);
      }
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.projecttitle]);

  // console.log(props.projecttitle);
  // console.log(props.chageside);

  return (
    <div className="flex flex-col items-start py-6 px-8 w-full justify-between gap-4">
      <p className="text-base font-normal">#{props.projecttitle}</p>

      <div className="shadow-xl bg-[#FFFCFC] rounded-3xl flex flex-col items-start gap-4 self-stretch px-12 py-11 overflow-y-auto h-[380px]">
        {chats.map((chat, index) => (
          <Message message={chat.message} key={`ChatMessage_${index}`} />
        ))}
      </div>
      <form
        className="shadow-xl flex px-5 py-3 items-center justify-between rounded-3xl bg-[#FFFCFC] w-full h-16 "
        onSubmit={handleSendMessage}
      >
        <div className="flex items-center shrink-0 gap-3 w-[95%] h-ull">
          <label htmlFor="file">
            <Image
              src="/Attach_file.svg"
              width={35}
              height={35}
              alt="ファイル"
            />
            <input type="file" id="file" className="hidden" />
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="メッセージ入力"
            className="outline-none w-full h-full bg-[#FFFCFC]"
          />
        </div>
        <button type="submit">
          <Image src="/Sent.svg" width={35} height={35} alt="アカウント詳細" />
        </button>
      </form>
    </div>
  );
}
