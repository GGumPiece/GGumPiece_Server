# 꿈조각

## 서비스 소개

`서비스 이름` : 꿈조각 🧩

`서비스 한 줄 소개` : 지금까지 꿨던 꿈들 중에 생각나는게 있으신가요 ? 꿈에서 깬 직후에는 너무나 생생하게 기억이 나는데, 기록해두지 않으면 흩어져 사라져버리죠. 꾸었던 꿈들을 모아 하나의 기억으로 돌려드릴게요. 당신의 꿈을, 대신 기억해주는 앱.

---

## Models

`models/User.ts` : 앱 사용자 모델

```typescript
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
```

`/interfaces/IUser`

```typescript
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
```

`/models/Post.ts` : 꿈 기록글 모델

```typescript
import mongoose from "mongoose";
import { IPost } from "../interfaces/IPost";

const PostSchema = new mongoose.Schema({
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
```

`/interfaces/IPost.ts`

```typescript
import mongoose from "mongoose";
import { IDreamReading } from "./IDreamReading";

export interface IPost {
  _id?: string;
  content: string;
  emoji: string;
  dreamReadings?: [IDreamReading];
  date: Date;
}
```

`/interfaces/IDreamReading` : 키워드 별 꿈 해몽

```typescript
import mongoose from "mongoose";

export interface IDreamReading {
  _id?: string;
  keyword: string;
  reading: string;
}
```

---

## API 명세서

