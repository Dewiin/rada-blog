import { useEffect, useState } from "react";

// api
import { fetchAllPublishedPosts, fetchAllUnpublishedPosts } from "@/api/profile";

// contexts
import { useAuth } from "@/contexts/AuthContext"
import { useUI } from "@/contexts/UIContext";

// components
import { PageUnauthorizedScreen } from "./PageUnauthorizedScreen";
import { PostPreview } from "@/components/postPreview/PostPreview";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator";
import { SkeletonPostPreview } from "@/components/skeleton/SkeletonPostPreview";
import { SkeletonProfile } from "@/components/skeleton/SkeletonProfile";

// types
import type { IPost } from "../types/Post";

export function AccountProfileScreen() {
    const { user, refreshToken, isAuthLoading } = useAuth();
    const { isLoading, setIsLoading, setError } = useUI();
    const [publishedPosts, setPublishedPosts] = useState<IPost[]>([]);
    const [unpublishedPosts, setUnpublishedPosts] = useState<IPost[]>([]);

    useEffect(() => {
        async function load() {
            setIsLoading(true);
            try {
                await Promise.all([
                    fetchAllPublishedPosts(setPublishedPosts, setError, refreshToken),
                    fetchAllUnpublishedPosts(setUnpublishedPosts, setError, refreshToken)
                ]);
            } finally {
                setIsLoading(false);
            }
        }

        load();
    }, [user]);

    if(!isAuthLoading && !user) return <PageUnauthorizedScreen />

    return (
        <div 
            className="md:mx-60 md:my-24 my-12 m-6 flex flex-col gap-8"
        >
            { !isLoading && 
                // profile 
                <div className="flex flex-col gap-1 items-center w-fit">
                    <Avatar className="w-20 h-20">
                        <AvatarImage alt={`@${user?.username}`} />
                        <AvatarFallback className="text-xl">{user?.username.substring(0,2)}</AvatarFallback>
                    </Avatar>
                    <p className="font-medium text-xl">{user?.username}</p>
                </div>
            }

            { isLoading && 
                // skeleton profile
                <SkeletonProfile /> 
            }

            {/* tabs and content */}
            {!isAuthLoading && 
            <Tabs defaultValue={user && user.role === "AUTHOR" ? "posts" : "activity"}>
                <TabsList variant="line" className="mb-4">
                    {user && user.role === "AUTHOR" && <TabsTrigger value="posts">Posts</TabsTrigger>}
                    {user && user.role === "AUTHOR" && <TabsTrigger value="unpublished">Unpublished</TabsTrigger>}
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent 
                    value="posts" 
                >
                    <div
                        className="flex flex-col gap-4"
                    >
                        { isLoading && Array.from({ length: 3 }).map((_, index) => (
                            <SkeletonPostPreview key={index} />
                        ))}
                        { !isLoading && publishedPosts.length === 0 && 
                            <p className="text-center text-sm">You have no published posts.</p> 
                        }
                        { !isLoading && publishedPosts.length > 0 && publishedPosts.map((publishedPost, index) => (
                            <div
                                key={publishedPost.id}
                                className="flex flex-col gap-4"
                            >
                                <PostPreview 
                                    post={publishedPost} 
                                    setPosts={setPublishedPosts}
                                />
                                {index < publishedPosts.length-1 && <Separator />}
                            </div>
                        ))}
                    </div>
                </TabsContent>
                
                <TabsContent value="unpublished" className="flex flex-col gap-4">
                    { isLoading && 
                        <SkeletonPostPreview />
                    }
                    { !isLoading && unpublishedPosts.length === 0 && 
                        <p className="text-center text-sm">You have no unpublished posts.</p> 
                    }
                    { !isLoading && unpublishedPosts.length > 0 && unpublishedPosts.map((unpublishedPost, index) => (
                        <div
                            key={unpublishedPost.id}
                            className="flex flex-col gap-4"
                        >
                            <PostPreview 
                                post={unpublishedPost} 
                                setPosts={setUnpublishedPosts}
                            />
                            {index < unpublishedPosts.length-1 && <Separator />}
                        </div>
                    ))}   
                </TabsContent>

                <TabsContent value="activity">
                    <p className="text-center text-sm">You have no activity.</p> 
                </TabsContent>
            </Tabs>
            }   
        </div>
    )
}