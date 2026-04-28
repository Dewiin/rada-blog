import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/contexts/ThemeContext";
import { Editor } from '@tinymce/tinymce-react';

// Components
import { PageForbiddenScreen } from "./PageForbiddenScreen";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export function CreatePostScreen() {
    const [ apiKey, setApiKey ] = useState<string | undefined>(undefined);
    const { user } = useAuth();
    const { darkMode } = useTheme();

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
        <div className="md:mx-40 md:my-16 m-6 flex flex-col gap-4">
            <div>
                <Label className="text-xl">
                    Title:
                </Label>
                <Input></Input>
            </div>
            <div>
                <Label className="text-xl">
                    Content:
                </Label>
                <Editor
                    key={ darkMode ? "dark" : "light" }
                    apiKey={apiKey}
                    init={{
                        menubar: false,
                        statusbar: false,
                        height: 600,
                        plugins: [
                            'advlist',
                            'autolink',
                            'lists',
                            'link',
                            'image',
                            'table',
                            'wordcount',
                        ],
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline | align lineheight | checklist numlist bullist indent outdent | image',
                        skin: darkMode ? 'oxide-dark' : 'oxide',
                        content_css: darkMode ? 'tinymce-5-dark' : 'writer'
                    }}
                />
            </div>
        </div>
        :
        <PageForbiddenScreen />
        }
        </>
    );
}