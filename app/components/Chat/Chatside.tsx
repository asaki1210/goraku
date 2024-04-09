import Image from "next/image";
import { project } from "@/app/lib/sampleData";
import ProjectList from "../ProjectList";
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

export default function Chatside({
  projectlist,
  projectsid,
  changeMessage,
}: {
  projectlist: Array<string>;
  projectsid: Array<string>;
  changeMessage: (change: string) => void;
}) {
  // console.log(projectlist);
  // console.log(projectsid);

  return (
    <div className="bg-[#FFBF91] h-screen overflow-hidden flex flex-col pt-[35px] w-[35%] justify-between gap-3">
      {/* マイプロジェクト */}
      <div className="flex flex-row font-bold pl-[10px]">
        <Image
          src="/myproject_icon.svg"
          width={26}
          height={26}
          alt="マイプロジェクト"
        />
        <p className="text-xl pl-2">マイプロジェクト</p>
      </div>
      <div className="ml-4 h-full shrink">
        <ul className="pt-4">
          {projectlist.map((p, i) => (
            <li
              onClick={() => changeMessage(projectsid[i])}
              key={i}
              className="mt-4"
            >
              # {p}
            </li>
          ))}
        </ul>
      </div>
      {/* アカウント */}
      <div className="bg-[#FFD5B7] flex flex-row pl-4 ">
        <Image
          src="/Account_icon.svg"
          width={36}
          height={36}
          alt="アカウント"
        />
        <p className="ml-2 mt-2 ">平井旭晃</p>
      </div>
    </div>
  );
}
