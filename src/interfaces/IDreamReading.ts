import mongoose from "mongoose";

export interface IDreamReading {
  _id?: string;
  keyword: string;
  reading: string;
}