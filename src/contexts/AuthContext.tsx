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
    refreshToken: () => Promise<void>,
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    setUser: () => {},
    checkToken: async () => {},
    refreshToken: async () => {},
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User|null>(null);
    
    useEffect(() => {
        checkToken();
    }, []);

    async function checkToken() {
        try {  
            let response = await fetch(`${VITE_API_URL}/api/auth/verifyToken`, {
                method: "POST",
                credentials: "include"
            });
            
            if(response.status === 401) {
                await refreshToken();
                response = await fetch(`${VITE_API_URL}/api/auth/verifyToken`, {
                    method: "POST",
                    credentials: "include"
                });
            }

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

    async function refreshToken() {
        try {
            await fetch(`${VITE_API_URL}/api/auth/refresh`, {
                method: "POST",
                credentials: "include"
            });
        } catch (err: any) {
            console.error(`Error in refreshToken: ${err.message}, ${err.stack}`);
        }
    }
    
    const values = {
        user,
        setUser,
        checkToken,
        refreshToken
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

