import React, { createContext, useState, useContext, useEffect } from 'react';
const VITE_API_URL = import.meta.env.VITE_API_URL;

type User = {
    id: string,
    username: string,
    role: string
}

type AuthContextProps = {
    user: User | null,
    setUser: (user: User | null) => void, 
    checkToken: () => Promise<void>,
    isLoading: boolean,
    setIsLoading: (isLoading: boolean) => void
    darkMode: boolean,
    setDarkMode: (darkMode: boolean) => void
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    setUser: () => {},
    checkToken: async () => {},
    isLoading: false,
    setIsLoading: () => {},
    darkMode: false,
    setDarkMode: () => {}
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [darkMode, setDarkMode] = useState(() => {
        if (localStorage.theme === "dark") return true;
        if (localStorage.theme === "light") return false;
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });
    
    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        if (isLoading) {
            document.body.style.pointerEvents = "none";
        } else {
            document.body.style.pointerEvents = "auto";
        }
    }, [isLoading]);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark";
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.theme = "light";
        }
    }, [darkMode]);

    async function checkToken() {
        try {  
            const response = await fetch(`${VITE_API_URL}/api/auth/verifyToken`, {
                method: "GET",
                credentials: "include"
            });
            const result = await response.json();

            if(!response.ok) {
                if(result.error) console.error(result.error);
                else console.error(`Error: ${response.status} ${response.statusText}`);
            } else {
                setUser(result);
            }
        } catch (err: any) {
            console.error(`Error in checkToken: ${err.message}, ${err.stack}`);
            setUser(null);
        }
    }
    
    const values = {
        user,
        setUser,
        checkToken,
        isLoading,
        setIsLoading,
        darkMode,
        setDarkMode
    }

    return (
        <AuthContext value={values}>
            { children }
        </AuthContext>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}

