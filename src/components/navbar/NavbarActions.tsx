import { useState } from "react"
import { useNavigate } from "react-router"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

// api
import { signup, login, logout, googleLogin } from "@/api/auth"

// components
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
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { UserAvatar } from "@/components/avatar/UserAvatar"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { User, Settings, LogOut, Newspaper } from "lucide-react"

// contexts
import { useAuth } from "@/contexts/AuthContext"
import { useUI } from "@/contexts/UIContext"

// schemas
import { signupSchema, loginSchema } from "@/zodSchemas/auth"

type AuthProps = {
    signInText?: string
    ctaText?: string
}
type AuthModes = "login" | "signup"

export function NavbarActions({
    signInText,
    ctaText,
}: AuthProps) {
    const [mode, setMode] = useState<AuthModes>("signup");
    const { user, setUser, getUser, isAuthLoading, setIsAuthLoading } = useAuth();
    const { setSuccess, setError } = useUI();
    const navigate = useNavigate();

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
        await toast.promise(
            signup(data, setIsAuthLoading, setError, setSuccess, getUser),
            { loading: "Signing up..." }
        );    
    }   
        
    async function onLoginSubmit(data: z.infer<typeof loginSchema>) {
        await toast.promise(
            login(data, setIsAuthLoading, setError, setSuccess, getUser),
            { loading: "Logging in..." }
        );
    }

    async function onLogoutSubmit() {
        await toast.promise(
            logout(setIsAuthLoading, setUser, setError, setSuccess),
            { loading: "Logging out..." }
        );
    }

    function onGoogleLogin() {
        googleLogin(setIsAuthLoading);
    }

    return (
        <>
            {!user &&
                <Dialog>
                    {!isAuthLoading &&
                        <>
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
                        </>
                    }
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
                                                    disabled={isAuthLoading}
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
                                                    disabled={isAuthLoading}
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
                                                    disabled={isAuthLoading}
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>

                                <Button className="w-full" type="submit" disabled={isAuthLoading}>Create Account</Button>

                                <div className="relative flex items-center gap-2">
                                    <Separator className="flex-1" />
                                    <span className="shrink-0 px-2 text-muted-foreground text-xs uppercase">
                                        Or continue with
                                    </span>
                                    <Separator className="flex-1" />
                                </div>
                                <Button 
                                    className="w-full" 
                                    variant="outline" 
                                    type="button" 
                                    disabled={isAuthLoading}
                                    onClick={() => onGoogleLogin()}
                                >
                                    <GoogleSVG />
                                    Continue with Google
                                </Button>
                            </form>
                            <DialogFooter className="sm:justify-center">
                                <p className="text-muted-foreground text-sm">
                                    Already have an account?{" "}
                                    <button 
                                        className="font-medium underline cursor-pointer" 
                                        type="button"
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
                                                    disabled={isAuthLoading}
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
                                                    disabled={isAuthLoading}
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>

                                <Button className="w-full" type="submit" disabled={isAuthLoading}>Log In</Button>

                                <div className="relative flex items-center gap-2">
                                    <Separator className="flex-1" />
                                    <span className="shrink-0 px-2 text-muted-foreground text-xs uppercase">
                                        Or continue with
                                    </span>
                                    <Separator className="flex-1" />
                                </div>
                                <Button 
                                    className="w-full" 
                                    variant="outline" 
                                    type="button" 
                                    disabled={isAuthLoading}
                                    onClick={() => onGoogleLogin()}
                                >
                                    <GoogleSVG />
                                    Continue with Google
                                </Button>
                            </form>
                            <DialogFooter className="sm:justify-center">
                                <p className="text-muted-foreground text-sm">
                                    Don't have an account?{" "}
                                    <button 
                                        className="font-medium underline cursor-pointer" 
                                        type="button"
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
            }
            {user &&
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="relative h-10 w-10 rounded-sm" variant="ghost">
                      <UserAvatar user={user} size="default" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex items-center gap-3">
                        <UserAvatar user={user} className="h-12 w-12" />
                        <div className="flex flex-col space-y-1 gap-1">
                          <p className="font-medium text-sm leading-none">{user.displayName}</p>
                          <Badge className="w-fit text-xs" variant="secondary">
                            {user.role.charAt(0) + user.role.substring(1).toLocaleLowerCase()}
                          </Badge>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    {user && user.role === "AUTHOR" &&
                        <DropdownMenuItem 
                        onClick={() => navigate('/create')}
                        >
                        <Newspaper />
                        Write a Post
                        </DropdownMenuItem>
                    }
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => navigate(`/profile/${user && user.id}`)}
                    >
                      <User />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive"
                    onClick={() => onLogoutSubmit()}
                    >
                      <LogOut />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            }
        </>
    )
}