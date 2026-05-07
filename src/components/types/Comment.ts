import type { IUser } from "./User"

export type IComment = {
    id: number,
    content: string,
    createdAt: Date,
    user: IUser,
    postId: number
}