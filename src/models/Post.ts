import mongoose from "mongoose";
import { IPost } from "../interfaces/IPost";

const PostSchema = new mongoose.Schema({
  id: {
    type: mongoose.SchemaTypes.ObjectId,
  },
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
});

export default mongoose.model<IPost & mongoose.Document>("Post", PostSchema);