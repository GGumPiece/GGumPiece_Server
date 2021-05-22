import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";

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
 /* post : [
    
    안에 뭘 넣어야 되죠?
    
  ],
  */

});

export default mongoose.model<IUser & mongoose.Document>("User", UserSchema);
