import { useState } from "react"

// components
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { SignupDialog } from "./SignupDialog"
import { LoginDialog } from "./LoginDialog"
import { CtaButtons } from "./CtaButtons"
import { ProfileDropdown } from "./ProfileDropdown"

// contexts
import { useAuth } from "@/contexts/AuthContext"

type AuthProps = {
    signInText: string
    ctaText: string
}
type AuthModes = "login" | "signup"

export function NavbarActions({
    signInText,
    ctaText,
}: AuthProps) {
    const [mode, setMode] = useState<AuthModes>("signup");
    const { user, isAuthLoading } = useAuth();

    return (
        <>
            {!user &&
                <Dialog>
                    {!isAuthLoading &&
                        <CtaButtons setMode={setMode} signInText={signInText} ctaText={ctaText} />
                    }
                    <DialogContent className="sm:max-w-md">
                        {mode === "signup" && 
                            <SignupDialog setMode={setMode} />
                        }
                        {mode === "login" && 
                            <LoginDialog setMode={setMode} />
                        }
                    </DialogContent>
                </Dialog>
            }
            {user &&
                <ProfileDropdown user={user} />
            }
        </>
    )
}