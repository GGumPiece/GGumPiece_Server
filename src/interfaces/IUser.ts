export interface IUser {
    id: string;
    name: string;
    password: string;
    postCount?: number;
   // post?: [IPosts];
  }
  
  export interface IUserInputDTO {
    id: string;
    name: string;
    password: string;
    postCount?: number;
   // post?: [IPosts];
  }
  