import { useAuth } from "@/contexts/AuthContext"
import { useUI } from "@/contexts/UIContext";
import { useState } from "react";

// Components
import { PageForbiddenScreen } from "./PageForbiddenScreen";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { Content } from "@tiptap/react"
import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap"
import { Button } from "../ui/button";
import { 
    Field,
    FieldDescription,
    FieldLabel 
} from "../ui/field";
import { toast } from "sonner";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export function CreatePostScreen() {
    const [title, setTitle] = useState<string>("");
    const [subtitle, setSubtitle] = useState<string>("");
    const [value, setValue] = useState<Content>("");
    const { user, refreshToken } = useAuth();
    const { isLoading, setIsLoading } = useUI();

    async function onSubmit() {
        setIsLoading(true);
        try {
            await toast.promise(
                async () => {
                    const data = {
                        title,
                        subtitle,
                        content: value,
                        published: true,
                        authorId: user?.id
                    };
    
                    let response = await fetch(`${VITE_API_URL}/api/posts`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                        credentials: "include",
                    });

                    if(response.status === 401) {
                        console.log("refreshing");
                        await refreshToken();
                        response = await fetch(`${VITE_API_URL}/api/posts`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(data),
                            credentials: "include",
                        });
                    }
                    const result = await response.json();
    
                    if(!response.ok) {
                        toast.warning(result.error, {
                            position: "top-center",
                            description: "Please try again."
                        });
                    } else {
                        toast.success(result.message, {
                            position: "top-center",
                            description: "View the new post on the home page."
                        })
                    }
                }, {
                    position: "top-center",
                    loading: "Submitting post...",
                }
            );
        } finally {
            setIsLoading(false);
        }
    }

    async function onSave() {
        setIsLoading(true);
        try {
            await toast.promise(
                async () => {
                    const data = {
                        title,
                        subtitle,
                        content: value,
                        published: false,
                        authorId: user?.id
                    };
    
                    let response = await fetch(`${VITE_API_URL}/api/posts`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                        credentials: "include",
                    });
                    if(response.status === 401) {
                        console.log("refreshing");
                        await refreshToken();
                        response = await fetch(`${VITE_API_URL}/api/posts`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(data),
                            credentials: "include",
                        });
                    }
                    const result = await response.json();
    
                    if(!response.ok) {
                        toast.warning(result.error, {
                            position: "top-center",
                            description: "Please try again."
                        });
                    } else {
                        toast.success(result.message, {
                            position: "top-center",
                            description: "View saved posts in your profile."
                        });
                    }
                }, {
                    position: "top-center",
                    loading: "Saving post...",
                }
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
        {user && user.role === "AUTHOR" ? 
        <div className="md:mx-40 md:my-24 my-12 m-6 flex flex-col gap-12">
            <Label className="text-5xl font-extrabold">
                Create a Post
            </Label>
            <div
                className="flex flex-col gap-6"
            >
                <Field 
                    className="flex flex-col gap-1"
                >
                    <Input 
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-input/30 font-extrabold"
                        placeholder="My Title"
                        aria-invalid={title.length === 0}
                    />
                    <Input 
                        onChange={(e) => setSubtitle(e.target.value)}
                        className="bg-input/30"
                        placeholder="Write a preview subtitle..."
                        aria-invalid={subtitle.length === 0}
                    />
                </Field>
                <div>
                    <MinimalTiptapEditor
                        value={value}
                        onChange={setValue}
                        className="w-full"
                        editorContentClassName="p-5 bg-input/30"
                        output="html"
                        placeholder="Enter your description..."
                        autofocus={true}
                        editable={true}
                        editorClassName="focus:outline-hidden"
                    />
                </div>
                <div className="flex gap-2">
                    <Button 
                        className="w-fit cursor-pointer"
                        onClick={() => onSubmit()}
                        disabled={isLoading}
                        type="submit"
                    >
                        Submit
                    </Button>
                    <Button 
                        className="w-fit cursor-pointer"
                        variant={"secondary"}
                        onClick={() => onSave()}
                        disabled={isLoading}
                        type="submit"
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
        :
        <PageForbiddenScreen />
        }
        </>
    );
}