import { useParams, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import DOMPurify from "dompurify";

// api
import { fetchPost } from "@/api/posts";
import { postClap } from "@/api/clap";

// components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";
import { SkeletonPostScreen } from "@/components/skeleton/SkeletonPostScreen";
import { FaArrowLeft, FaRegComment } from "react-icons/fa6";
import { PiHandsClappingLight } from "react-icons/pi";
import { PageForbiddenScreen } from "./PageForbiddenScreen";
import { CommentSection } from "@/components/comments/CommentSection";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import { SlidingNumber } from "@/components/animate-ui/primitives/texts/sliding-number";

// contexts
import { useUI } from "@/contexts/UIContext";
import { useAuth } from "@/contexts/AuthContext";

// helpers
import { formatDate } from "@/helpers/formatDate";
import { aggregateClaps } from "@/helpers/aggregateClaps";

// types
import type { IPost } from "@/components/types/Post";

export function PostScreen() {
    const [post, setPost] = useState<IPost | null>(null);
    const [claps, setClaps] = useState<number>(0);
    const { id } = useParams();
    const { setError, isLoading, setIsLoading } = useUI();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(id) fetchPost(id, setIsLoading, setError, setPost);
    }, []);

    useEffect(() => {
        if(post) setClaps(aggregateClaps(post.claps));
    }, [post]);

    if (!isLoading && post) {
        if (!post.published && post.author.id !== user?.id) {
            return <PageForbiddenScreen />
        }
    }

    async function onClapSubmit() {
        if(post) await postClap(post.id.toLocaleString(), setClaps, setError);
    }

    return (
        <>
            <div className="flex md:flex-row flex-col md:gap-20 gap-6 md:mx-64 md:my-24 m-12">
                <div>
                    <FaArrowLeft 
                        onClick={() => navigate(-1)}
                        size={24}  
                        className="cursor-pointer md:mt-2"
                    />
                </div>

                {/* content */}
                <div className="w-full flex flex-col gap-4">
                    {/* header */}
                    <div className="flex flex-col gap-4">

                        { isLoading && <SkeletonPostScreen /> }

                        { !isLoading && 
                        <>
                            {/* title */}
                            <p className="text-3xl font-bold">
                                {post?.title}
                            </p>

                            {/* subtitle */}
                            <p className="dark:text-stone-500 text-stone-600">
                                {post?.subtitle}
                            </p>

                            {/* author */}
                            <div 
                                onClick={() => navigate(`/profile/${post?.author.id}`)}
                                className="flex gap-2 items-center text-sm cursor-pointer"
                            >
                                <Avatar 
                                    size="default"
                                >
                                    <AvatarImage alt={`@${post?.author.username}`} />
                                    <AvatarFallback>{post?.author.username.substring(0,2)}</AvatarFallback>
                                </Avatar>
                                <p>
                                    <span className="hover:underline">
                                        {post?.author.username}
                                    </span>
                                    {" · "} 
                                    <span className="dark:text-stone-500 text-stone-600">
                                        {post && formatDate(post.createdAt)}
                                    </span>
                                </p>
                            </div>

                            <Separator />
                                {/* claps and comments */}
                                <div className="flex gap-8 mx-2">
                                    <div 
                                        className="flex items-center gap-2 cursor-pointer"
                                        onClick={() => onClapSubmit()}
                                    >
                                        <PiHandsClappingLight className="active:scale-90" />
                                        <SlidingNumber 
                                            number={claps}
                                            delay={100}
                                            thousandSeparator=","
                                        />
                                    </div>
                                    <Drawer direction="right">
                                        <DrawerTrigger asChild>
                                            <div className="flex items-center gap-2 cursor-pointer">
                                                <FaRegComment className="active:scale-90" />
                                                {post?.comments.length}
                                            </div>
                                        </DrawerTrigger>
                                        <DrawerContent className="overflow-y-scroll overflow-x-hidden">
                                            <CommentSection post={post} isDrawer />
                                        </DrawerContent>
                                    </Drawer>
                                </div>
                            <Separator />
                        </>
                        }
                    </div>

                    {/* body */}
                    {post && 
                    <div className="prose prose-sm dark:prose-invert prose-stone max-w-none">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(post.content)
                            }}
                            className="text-lg/8"
                        />
                    </div>
                    }

                    <Separator className="my-12" />

                    {/* Comments */}
                    {!isLoading && <CommentSection post={post} /> }
                </div>

            </div>
        </>
    )
}