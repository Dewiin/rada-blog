import type { IComment } from "./Comment";
import type { IUser } from "./User";
import type { IClap } from "./Clap";

export type IPost = {
    id: number,
    title: string,
    subtitle: string,
    content: string,
    createdAt: Date,
    updatedAt: Date, 
    published: boolean, 
    claps: IClap[],
    author: IUser
    comments: IComment[]
};