const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function signup(data: {
        username: string,
        password: string, 
        confirmPassword: string
    },
    setIsLoading: Function,
    setError: Function,
    setSuccess: Function,
    checkToken: Function,
) {
    setIsLoading(true);
    try {
        const response = await fetch(`${VITE_API_URL}/api/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include",
        });
        const result = await response.json();
        if(!response.ok) {
            if(response.status === 409) {
                setError({
                    title: result.error,
                    description: "Please try again with a different username."
                })
            }
        } else {
            setSuccess({ title: result.message }); 
            await checkToken();
        }
    } finally {
        setIsLoading(false);
    }
}   
    
export async function login(data: {
        username: string,
        password: string,
    },
    setIsLoading: Function,
    setError: Function,
    setSuccess: Function,
    checkToken: Function,
) {
    setIsLoading(true);
    try {
        const response = await fetch(`${VITE_API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include",
        });
        const result = await response.json();

        if(!response.ok) {
            setError({ title: result.error });
        } else {
            setSuccess({ title: result.message }); 
            await checkToken();
        }
    } finally {
        setIsLoading(false);
    }
}

export async function logout(
    setIsLoading: Function,
    setUser: Function,
    setError: Function,
    setSuccess: Function,
) {
    setIsLoading(true);
    try {
        const response = await fetch(`${VITE_API_URL}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        const result = await response.json();

        if(!response.ok) {
            setError({ title: result.error });
        } else {
            setUser(null);
            if(result.message) setSuccess({ title: result.message });
        }
    } finally {
        setIsLoading(false);
    }
}