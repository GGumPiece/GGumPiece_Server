import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";
import Post from "./Post";

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  postCount: {
    type: Number,
  },
  posts: [
    {
      content: {
        type: String,
        required: true,
      },
      emoji: {
        type: String,
        required: true,
      },
      dreamReadings: [
        {
          keyword: {
            type: String,
          },
          reading: {
            type: String,
          },
        },
      ],
      date: {
        type: Date,
        defaul: Date.now,
      },
    },
  ],
});

export default mongoose.model<IUser & mongoose.Document>("User", UserSchema);
