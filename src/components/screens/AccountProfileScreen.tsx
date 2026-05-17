import { useEffect, useState } from "react";
import { useParams } from "react-router";

// api
import { fetchAllPublishedPosts, fetchAllUnpublishedPosts, fetchAllActivity } from "@/api/profile";

// contexts
import { useAuth } from "@/contexts/AuthContext"
import { useUI } from "@/contexts/UIContext";

// components
import { PostPreview } from "@/components/postPreview/PostPreview";
import { UserAvatar } from "@/components/avatar/UserAvatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator";
import { SkeletonPostPreview } from "@/components/skeleton/SkeletonPostPreview";
import { SkeletonProfile } from "@/components/skeleton/SkeletonProfile";
import { FaRegComment } from "react-icons/fa6";
import { PiHandsClappingLight } from "react-icons/pi";

// screens
import { PageUnauthorizedScreen } from "./PageUnauthorizedScreen";
import { PageForbiddenScreen } from "./PageForbiddenScreen";

// types
import type { IPost } from "../types/Post";

export function AccountProfileScreen() {
    const { userId } = useParams();
    const { user, isAuthLoading } = useAuth();
    const { isLoading, setIsLoading, setError } = useUI();
    const [publishedPosts, setPublishedPosts] = useState<IPost[]>([]);
    const [unpublishedPosts, setUnpublishedPosts] = useState<IPost[]>([]);
    const [activities, setActivities] = useState<any[]>([]);

    useEffect(() => {
        if (isAuthLoading || !user) return;

        async function load() {
            setIsLoading(true);
            try {
                if(user && user.role === "AUTHOR" && user.id === userId) {
                    await Promise.all([
                        fetchAllPublishedPosts(setPublishedPosts, setError),
                        fetchAllUnpublishedPosts(setUnpublishedPosts, setError),
                    ]);
                }
                await fetchAllActivity(setActivities, setError);
            } finally {
                setIsLoading(false);
            }
        }

        load();
    }, [user, isAuthLoading]);

    if(isAuthLoading) return null;
    if(!user) return <PageUnauthorizedScreen />
    if(user.id !== userId) return <PageForbiddenScreen />

    return (
        <div 
            className="md:mx-60 md:my-24 my-12 m-6 flex flex-col gap-8"
        >
            { !isLoading && 
                // profile 
                <div className="flex flex-col gap-1 items-center w-fit">
                    <UserAvatar user={user} className="w-20 h-20" />
                    <p className="font-medium text-xl">{user?.displayName}</p>
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
                    { isLoading && Array.from({ length: 3 }).map((_, index) => (
                        <SkeletonPostPreview key={index} />
                    ))}
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
                    { isLoading && Array.from({ length: 3 }).map((_, index) => (
                        <SkeletonPostPreview key={index} />
                    ))}
                    { !isLoading && activities.length === 0 &&
                        <p className="text-center text-sm mt-12">You have no activity.</p> 
                    }
                    { !isLoading && activities.length > 0 && activities.map((activity, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-4"
                        >   
                            <div className="mt-8 mx-4 flex gap-2 items-center dark:text-stone-500 text-stone-600">
                                <p>
                                    {activity.type === "clap" ? <PiHandsClappingLight /> : <FaRegComment />}
                                </p>
                                <p className="text-sm">
                                    {activity.type === "clap" ? "You clapped" : "You responded"}
                                </p>
                            </div>
                            <PostPreview 
                                post={activity} 
                                setPosts={setActivities}
                            />
                            {index < activities.length-1 && <Separator />}
                        </div>
                    ))}
                </TabsContent>
            </Tabs>
            }   
        </div>
    )
}