export type IComment = {
    id: number,
    content: string,
    createdAt: Date,
    user: {
        id: string,
        username: string
    }
    postId: number
}