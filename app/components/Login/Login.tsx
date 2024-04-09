import { FormEvent, useState } from "react";
import Home from "../Home/Home";
import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { redirect } from "next/dist/server/api-utils";
export default function Login({
  changeTab,
  changeId,
}: {
  changeTab: (
    nav:
      | "Home"
      | "Chat"
      | "Cart"
      | "ProjectCreate"
      | "ProjectSearch"
      | "ProjectPage"
      | "Login"
  ) => void;
  changeId: (id: string) => void;
}) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // console.log({ email, password });
    e.preventDefault();
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      //ユーザーid取得
      const userid = auth.lastNotifiedUid;
      if (userid.length > 0) {
        changeId(userid);
        changeTab("Home");
      } else {
        changeTab("Login");
      }
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e);
      }
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center w-full gap-4 mt-[15%]"
      >
        <input
          type={"email"}
          name={"email"}
          value={email}
          placeholder="メールアドレス"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="w-1/4 outline-none"
        />
        <input
          type={"password"}
          name={"password"}
          value={password}
          placeholder="パスワード"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-1/4 outline-none"
        />
        <button type={"submit"} className="bg-[#FFBF91] rounded-3xl w-1/4">
          <div className="font-bold text-white">login</div>
        </button>
      </form>
    </>
  );
}
