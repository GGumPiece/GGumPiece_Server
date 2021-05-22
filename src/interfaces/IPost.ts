import mongoose from "mongoose";
import { IDreamReading } from "./IDreamReading";

export interface IPost {
  _id?: string;
  content: string;
  emoji: string;
  dreamReadings?: [IDreamReading];
  date: Date;
}

// export interface IPostInputDTO {
//   content: string;
//   emoji: string;
//   dreamReadings?: [IDreamReading];
// }