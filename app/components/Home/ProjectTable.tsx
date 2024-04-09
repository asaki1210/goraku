import { useState } from "react";
import Project from "./Project";
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
  price: number;
  description: string;
}

interface Detail {
  description: string;
  photo: string;
  headline: string;
}
export default function ProjectTable(
  { data }: { data: Array<Data> },
  {
    flag,
    onclick,
    changeTab,
  }: {
    flag: boolean;
    onclick?: React.MouseEventHandler;
    changeTab: (
      nav:
        | "Home"
        | "Chat"
        | "Cart"
        | "ProjectCreate"
        | "ProjectSearch"
        | "ProjectPage"
    ) => void;
  }
) {
  const [show, setShow] = useState<boolean>(false);
  setTimeout(() => setShow(true), 2000);
  console.log(data);

  return (
    <div className="flex p-6 items-center content-center gap-8 flex-wrap w-full">
      {show && (
        <>
          <li onClick={() => changeTab("ProjectPage")}>
            {data.map((d, i) => (
              <Project
                title={d.title}
                targetAmount={d.targetAmount}
                people={d.people}
                photo={d.photo}
                key={i}
              />
            ))}
          </li>
        </>
      )}
    </div>
  );
}
