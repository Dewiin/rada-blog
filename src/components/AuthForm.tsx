import { useState } from "react"

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

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
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Username</Label>
                            <Input id="name" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Confirm Password</Label>
                            <Input id="password" type="password" />
                        </div>
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
                    </div>
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
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Username</Label>
                            <Input id="name" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" />
                        </div>
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
                    </div>
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