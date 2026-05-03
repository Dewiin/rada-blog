import type { IComment } from "./Comment";

export type IPost = {
    id: number,
    title: string,
    content: string,
    createdAt: Date,
    updatedAt: Date, 
    published: boolean, 
    author: {
        id: string,
        username: string
    }
    comments: IComment[]
};