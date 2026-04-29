import { useAuth } from "@/contexts/AuthContext"

// Components
import { PageForbiddenScreen } from "./PageForbiddenScreen";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { Content } from "@tiptap/react"
import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap"

const VITE_API_URL = import.meta.env.VITE_API_URL;

export function CreatePostScreen() {
    const [ apiKey, setApiKey ] = useState<string | undefined>(undefined);
    const [value, setValue] = useState<Content>("")
    const { user } = useAuth();

    useEffect(() => {
        async function getApiKey() {
            try {
                const response = await fetch(`${VITE_API_URL}/api/keys`, {
                    method: "GET",
                    credentials: "include",
                });

                if(!response.ok) {
                    console.error("Error fetching api key: ", response.status, response.statusText);
                    return;
                }
                
                const result = await response.json();
                setApiKey(result.tiny_mce_api_key);
            } catch (err: any) {
                console.error("Error fetching api key: ", err);
            }
        }

        if(apiKey === undefined) {
            getApiKey();
        }
    }, [user, apiKey]);

    return (
        <>
        {apiKey && user && user.role === "AUTHOR" ? 
        <div className="md:mx-40 md:my-24 my-12 m-6 flex flex-col gap-12">
            <Label className="text-5xl font-extrabold">
                Create a Post
            </Label>
            <div
                className="flex flex-col gap-4"
            >
                <div>
                    <Label className="text-md">
                        Title:
                    </Label>
                    <Input className="bg-input/30"></Input>
                </div>
                <div>
                    <Label className="text-md">
                        Content:
                    </Label>
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
            </div>
        </div>
        :
        <PageForbiddenScreen />
        }
        </>
    );
}