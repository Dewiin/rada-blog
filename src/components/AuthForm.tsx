import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/contexts/AuthContext"
import z, { check } from "zod"

// Components
import { Button, GoogleSVG } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

// API
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Username and passphrase parameters
const USER_LEN_MINIMUM = 6
const USER_LEN_MAXIMUM = 20
const PASS_LEN_MINIMUM = 10
const PASS_LEN_MAXIMUM = 512
const PRINTABLE_UNICODE = /^[\P{Cc}\P{Cn}\P{Cs}]+$/gu // allow only, printable (unicode) characters; https://stackoverflow.com/a/12054775
const PRINTABLE_MESSAGE = "can only contain printable characters."

const signupSchema = z.object({
    username: z.string().min(USER_LEN_MINIMUM, {
        message: "Username must be at least " + USER_LEN_MINIMUM + " characters.",
    }).max(USER_LEN_MAXIMUM, {
        message: "Username has a " + USER_LEN_MAXIMUM + " character limit."
    }).regex(PRINTABLE_UNICODE, { 
        message: "Username " + PRINTABLE_MESSAGE
    }),
    password: z.string().min(PASS_LEN_MINIMUM, {
        message: "Password must be at least " + PASS_LEN_MINIMUM + " characters."
    }). max(PASS_LEN_MAXIMUM, {
        message: "Password has a " + PASS_LEN_MAXIMUM + " character limit."
    }).regex(PRINTABLE_UNICODE, { 
        message: "Password " + PRINTABLE_MESSAGE
    }),
    confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
});

const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
});

type AuthProps = {
    signInText?: string
    ctaText?: string
}
type AuthModes = "login" | "signup"
export function AuthForm({
    signInText,
    ctaText,
}: AuthProps) {
    const [mode, setMode] = useState<AuthModes>("signup");
    const { user, checkToken } = useAuth();

    const signupForm = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });
    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
        mode: "onChange"
    });

    async function onSignupSubmit(data: z.infer<typeof signupSchema>) {
        // ... loading and signup
        try {
            const response = await fetch(`${VITE_API_URL}/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include",
            });
            if(!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            if(result.message) {
                await checkToken();
            }
        } catch (err: any) {
            throw new Error(`Error in onSignupSubmit: ${err.message}, ${err.stack}`);
        }
    }

    async function onLoginSubmit(data: z.infer<typeof loginSchema>) {
        // ... loading and signin
        try {
            const response = await fetch(`${VITE_API_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include",
            });
            if(!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            if(result.message) {
                await checkToken();
            }
            console.log(user);
        } catch (err: any) {
            throw new Error(`Error in onLoginSubmit: ${err.message}, ${err.stack}`);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="text-sm font-medium px-4 h-9 hover:bg-accent hover:text-accent-foreground"
                    size="sm"
                    variant="ghost"
                    onClick={() => setMode("login")}
                >
                    {signInText}
                </Button>
            </DialogTrigger>
            <DialogTrigger asChild>
                <Button
                    className="text-sm font-medium px-4 h-9 rounded-md shadow-sm"
                    size="sm"
                    onClick={() => setMode("signup")}
                >
                    {ctaText}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                {mode === "signup" && 
                <>
                    <DialogHeader>
                        <DialogTitle>Create an account</DialogTitle>
                        <DialogDescription>Enter your details below to create your account.</DialogDescription>
                    </DialogHeader>
                    <form 
                    onSubmit={signupForm.handleSubmit(onSignupSubmit)}
                    className="flex flex-col gap-4"
                    >
                        <FieldGroup className="gap-3">
                            <Controller
                                name="username"
                                control={signupForm.control}
                                render={({ field, fieldState }) => (
                                    <Field 
                                    data-invalid={fieldState.invalid} 
                                    className="gap-1"
                                    >
                                        <FieldLabel>
                                            Username
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="password"
                                control={signupForm.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="gap-1">
                                        <FieldLabel>
                                            Password
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="password"
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="new-password"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="confirmPassword"
                                control={signupForm.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="gap-1">
                                        <FieldLabel>
                                            Confirm Password
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="password"
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="new-password"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        <Button className="w-full">Create Account</Button>

                        <div className="relative flex items-center gap-2">
                            <Separator className="flex-1" />
                            <span className="shrink-0 px-2 text-muted-foreground text-xs uppercase">
                                Or continue with
                            </span>
                            <Separator className="flex-1" />
                        </div>
                        <Button className="w-full" variant="outline">
                            <GoogleSVG />
                            Continue with Google
                        </Button>
                    </form>
                    <DialogFooter className="sm:justify-center">
                        <p className="text-muted-foreground text-sm">
                            Already have an account?{" "}
                            <button className="font-medium underline cursor-pointer" type="button"
                            onClick={() => setMode("login")}
                            >
                                Sign in
                            </button>
                        </p>
                    </DialogFooter>
                </>
                }
                {mode === "login" && 
                <>
                    <DialogHeader>
                        <DialogTitle>Welcome Back</DialogTitle>
                        <DialogDescription>Enter your credentials to access your account.</DialogDescription>
                    </DialogHeader>
                    <form 
                    onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                    className="flex flex-col gap-4"
                    >
                        <FieldGroup className="gap-3">
                            <Controller
                                name="username"
                                control={loginForm.control}
                                render={({ field, fieldState }) => (
                                    <Field 
                                    data-invalid={fieldState.invalid} 
                                    className="gap-1"
                                    >
                                        <FieldLabel>
                                            Username
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="password"
                                control={loginForm.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="gap-1">
                                        <FieldLabel>
                                            Password
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="password"
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="new-password"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        <Button className="w-full">Log In</Button>

                        <div className="relative flex items-center gap-2">
                            <Separator className="flex-1" />
                            <span className="shrink-0 px-2 text-muted-foreground text-xs uppercase">
                                Or continue with
                            </span>
                            <Separator className="flex-1" />
                        </div>
                        <Button className="w-full" variant="outline">
                            <GoogleSVG />
                            Continue with Google
                        </Button>
                    </form>
                    <DialogFooter className="sm:justify-center">
                        <p className="text-muted-foreground text-sm">
                            Don't have an account?{" "}
                            <button className="font-medium underline cursor-pointer" type="button"
                            onClick={() => setMode("signup")}
                            >
                                Sign Up
                            </button>
                        </p>
                    </DialogFooter>
                </>
                }
            </DialogContent>
        </Dialog>
    )
}