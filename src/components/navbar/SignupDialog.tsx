import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

// api
import { signup, googleLogin } from "@/api/auth"

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
import { signupSchema } from "@/zodSchemas/auth"

export function SignupDialog({ setMode }: { setMode: Function }) {
    const { isAuthLoading, setIsAuthLoading, getUser } = useAuth();
    const { setError, setSuccess } = useUI();
    const [ passwordVisible, setPasswordVisible ] = useState<{
        "password": boolean,
        "confirmPassword": boolean
    }>({
        "password": false,
        "confirmPassword": false,
    });

    const signupForm = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    async function onSignupSubmit(data: z.infer<typeof signupSchema>) {
        await toast.promise(
            signup(data, setIsAuthLoading, setError, setSuccess, getUser),
            { loading: "Signing up..." }
        );    
    }   

    return (
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
                                <InputGroup>
                                    <InputGroupInput
                                        {...field}
                                        type={passwordVisible["password"] ? "text" : "password"}
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="new-password"
                                        disabled={isAuthLoading}
                                    />
                                    <InputGroupAddon 
                                        align="inline-end"
                                        className="cursor-pointer"
                                        onClick={() => setPasswordVisible((prev) => ({
                                            ...prev,
                                            "password": !passwordVisible["password"]
                                        }))}          
                                    >
                                        {passwordVisible["password"] ? 
                                            <Eye /> : <EyeOff />
                                        }
                                    </InputGroupAddon>
                                </InputGroup>
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
                                <InputGroup>
                                    <InputGroupInput
                                        {...field}
                                        type={passwordVisible["confirmPassword"] ? "text" : "password"}
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="new-password"
                                        disabled={isAuthLoading}
                                    />
                                    <InputGroupAddon 
                                        align="inline-end"
                                        className="cursor-pointer"
                                        onClick={() => setPasswordVisible((prev) => ({
                                            ...prev,
                                            "confirmPassword": !passwordVisible["confirmPassword"]
                                        }))}  
                                    >
                                        {passwordVisible["confirmPassword"] ? 
                                            <Eye /> : <EyeOff />
                                        }
                                    </InputGroupAddon>
                                </InputGroup>
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
                    onClick={() => googleLogin(setIsAuthLoading)}
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
    )
}