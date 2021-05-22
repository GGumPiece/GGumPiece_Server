import { IPost } from "./IPost";

export interface IUser {
    id: string;
    name: string;
    password: string;
    postCount?: number;
    posts?: [IPost];
  }
  
  export interface IUserInputDTO {
    id: string;
    name: string;
    password: string;
    postCount?: number;
    posts?: [IPost];
  }
  