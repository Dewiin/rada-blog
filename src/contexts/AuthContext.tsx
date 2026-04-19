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
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    setUser: () => {},
    checkToken: async () => {}
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User|null>(null);

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
            console.log(result);
            setUser(result);
        } catch (err: any) {
            throw new Error(`Error in checkToken: ${err.message}, ${err.stack}`);
        }
    }

    useEffect(() => {
        checkToken();
    }, []);

    const values = {
        user,
        setUser,
        checkToken
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

