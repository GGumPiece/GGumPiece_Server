import mongoose from "mongoose";
import { IDreamReading } from "./IDreamReading";

export interface IPost {
  id: mongoose.Types.ObjectId;
  content: string;
  emoji: string;
  dreamReadings: [IDreamReading];
  date: Date;
}