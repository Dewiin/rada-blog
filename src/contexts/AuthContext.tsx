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
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    setUser: () => {},
    checkToken: async () => {},
    isLoading: false,
    setIsLoading: () => {}
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        document.body.style.cursor = isLoading ? 'wait' : 'default';
        console.log("IsLoading: ", isLoading);
    }, [isLoading]);

    async function checkToken() {
        try {  
            const response = await fetch(`${VITE_API_URL}/api/auth/verifyToken`, {
                method: "GET",
                credentials: "include"
            });
            if(!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            
            const result = await response.json();
            setUser(result);
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
        setIsLoading
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

