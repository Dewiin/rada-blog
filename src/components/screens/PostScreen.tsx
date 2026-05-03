import { useParams } from "react-router"

export function PostScreen() {
    const { id } = useParams();

    return (
        <>
            This is Post {id}
        </>
    )
}