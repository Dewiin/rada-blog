import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

// api
import { login, googleLogin } from "@/api/auth"

// components
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { 
    Field, 
    FieldError, 
    FieldGroup, 
    FieldLabel 
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button, GoogleSVG } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"

// contexts
import { useUI } from "@/contexts/UIContext"
import { useAuth } from "@/contexts/AuthContext"

// schemas
import { loginSchema } from "@/zodSchemas/auth"

export function LoginDialog({ setMode }: { setMode: Function }) {
    const { isAuthLoading, setIsAuthLoading, getUser } = useAuth();
    const { setError, setSuccess } = useUI();

    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
        mode: "onChange"
    });
        
    async function onLoginSubmit(data: z.infer<typeof loginSchema>) {
        await toast.promise(
            login(data, setIsAuthLoading, setError, setSuccess, getUser),
            { loading: "Logging in..." }
        );
    }
    
    return (
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
                                <InputGroup>
                                    <InputGroupInput
                                        {...field}
                                        type="password"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="new-password"
                                        disabled={isAuthLoading}
                                    />
                                    <InputGroupAddon align="inline-end">
                                        <EyeOff />
                                    </InputGroupAddon>
                                </InputGroup>
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
                    onClick={() => googleLogin(setIsAuthLoading)}
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
    )
}   