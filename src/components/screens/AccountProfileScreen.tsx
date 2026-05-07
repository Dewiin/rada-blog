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

// types
import type { IPost } from "../types/Post";

export function AccountProfileScreen() {
    const { user, refreshToken } = useAuth();
    const { isLoading, setIsLoading, setError } = useUI();
    const [publishedPosts, setPublishedPosts] = useState<IPost[]>([]);
    const [unpublishedPosts, setUnpublishedPosts] = useState<IPost[]>([]);

    useEffect(() => {
        fetchAllPublishedPosts(setPublishedPosts, setError, setIsLoading, refreshToken);
        fetchAllUnpublishedPosts(setUnpublishedPosts, setError, setIsLoading, refreshToken);
    }, []);

    return (
        <>
            {user ? (
                <div 
                    className="md:mx-60 md:my-24 my-12 m-6 flex flex-col gap-8"
                >
                    {/* profile */}
                    <div className="flex flex-col gap-1 items-center w-fit">
                        <Avatar className="w-20 h-20">
                            <AvatarImage alt={`@${user?.username}`} />
                            <AvatarFallback className="text-xl">{user.username.substring(0,2)}</AvatarFallback>
                        </Avatar>
                        <p className="font-medium text-xl">{user?.username}</p>
                    </div>

                    {/* tabs and content */}
                    <Tabs defaultValue="posts">
                        <TabsList variant="line" className="mb-4">
                            <TabsTrigger value="posts">Posts</TabsTrigger>
                            <TabsTrigger value="unpublished">Unpublished</TabsTrigger>
                            <TabsTrigger value="activity">Activity</TabsTrigger>
                        </TabsList>

                        <TabsContent 
                            value="posts" 
                        >
                            <div
                                className="flex flex-col gap-4"
                            >
                                { publishedPosts.length === 0 && 
                                    <p className="text-center text-sm">You have no published posts.</p> 
                                }
                                { !isLoading && publishedPosts.length > 0 && publishedPosts.map((publishedPost, index) => (
                                    <div
                                        key={publishedPost.id}
                                        className="flex flex-col gap-4"
                                    >
                                        <PostPreview 
                                            post={publishedPost} 
                                        />
                                        {index < publishedPosts.length-1 && <Separator />}
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                        
                        <TabsContent value="unpublished" className="flex flex-col gap-4">
                            { unpublishedPosts.length === 0 && 
                                <p className="text-center text-sm">You have no unpublished posts.</p> 
                            }
                            { !isLoading && unpublishedPosts.length > 0 && unpublishedPosts.map((unpublishedPost, index) => (
                                <div
                                    key={unpublishedPost.id}
                                    className="flex flex-col gap-4"
                                >
                                    <PostPreview 
                                        post={unpublishedPost} 
                                    />
                                    {index < unpublishedPosts.length-1 && <Separator />}
                                </div>
                            ))}   
                        </TabsContent>

                        <TabsContent value="activity">
                            <p className="text-center text-sm">You have no activity.</p> 
                        </TabsContent>
                    </Tabs>
                </div>
            ) : (
                <PageUnauthorizedScreen />
            )}
        </>
    )
}