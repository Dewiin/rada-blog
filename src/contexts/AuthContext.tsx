import React, { createContext, useState, useContext, useEffect } from 'react';

// api
import { fetchUser } from '@/api/client';

// context
import { useUI } from './UIContext';

// types
import type { IUser } from '@/components/types/User';

type AuthContextProps = {
    user: IUser | null,
    setUser: (user: IUser | null) => void, 
    getUser: () => Promise<void>,
    isAuthLoading: boolean,
    setIsAuthLoading: (isAuthLoading: boolean) => void,
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    setUser: () => {},
    getUser: async () => {},
    isAuthLoading: false,
    setIsAuthLoading: () => {},
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser|null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);
    const { setError } = useUI();
    
    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        await fetchUser(setUser, setError, setIsAuthLoading);
    }
    
    const values = {
        user,
        setUser,
        getUser,
        isAuthLoading,
        setIsAuthLoading
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

