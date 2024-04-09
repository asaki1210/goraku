import { Timestamp } from "firebase/firestore";
import { MouseEventHandler } from "react";

export interface ProjectListProps {
  title: string;
  child: Array<string>;
}

export interface MessageListProps {
  message: string;
  flag: number;
}

export interface LoginProps {
  flag: boolean;
  onclick?: MouseEventHandler;
}

export interface Return {
  photo: string;
  price: string;
  description: string;
}

export interface Detail {
  description: string;
  photo: string;
  headline: string;
}

export interface Data {
  people: number;
  documentId: string;
  amountAchieved: number;
  targetAmount: number;
  return: Return[];
  detail: Detail[];
  createdDate: Timestamp;
  photo: string;
  deleteDate?: Timestamp;
  createdBy: string;
  prefectures: number;
  category: number;
  title: string;
  updatedDate: Timestamp;
  closingDate: Timestamp;
}
