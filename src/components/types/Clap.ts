import type { IUser } from "./User"
import type { IPost } from "./Post"

export type IClap = {
    id: number,
    amount: number,
    post: IPost,
    user: IUser,
}