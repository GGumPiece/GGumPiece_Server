import mongoose from "mongoose";
import { IDreamReading } from "./IDreamReading";

export interface IPost {
  content: string;
  emoji: string;
  dreamReadings: [IDreamReading];
  date: Date;
}

export interface IPostInputDTO {
  id: mongoose.Types.ObjectId;
  content: string;
  emoji: string;
  dreamReadings?: [IDreamReading];
}